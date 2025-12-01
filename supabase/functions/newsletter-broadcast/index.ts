import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 1. Parse the Webhook payload (from Supabase Database Webhook)
        const payload = await req.json()
        console.log('Webhook received:', payload)

        // Only react to INSERT events
        if (payload.type !== 'INSERT') {
            return new Response('Not an INSERT event', { status: 200 })
        }

        const record = payload.record
        const table = payload.table

        // 2. Initialize Supabase Client (Admin)
        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

        // 3. Fetch Subscribers
        const { data: subscribers, error: subError } = await supabase
            .from('newsletter_subscribers')
            .select('email')
            .eq('is_active', true)

        if (subError) throw subError
        if (!subscribers || subscribers.length === 0) {
            return new Response('No subscribers to notify', { status: 200 })
        }

        // 4. Prepare Email Content
        let subject = ''
        let htmlContent = ''

        if (table === 'products') {
            subject = `Nouveauté : ${record.name} est disponible !`
            htmlContent = `
        <h1>Nouveau produit sur Islamic Shop</h1>
        <p>Découvrez notre dernière arrivée : <strong>${record.name}</strong></p>
        <p>${record.description || ''}</p>
        <p>Prix : ${record.price}€</p>
        <br/>
        <a href="https://votre-site.com" style="background-color: #166534; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voir la boutique</a>
      `
        } else {
            // Default fallback
            subject = 'Nouvelle publication sur Islamic Shop'
            htmlContent = `<p>Du nouveau contenu est disponible sur le site !</p>`
        }

        // 5. Send Emails via Resend (Batch or Loop)
        // For simplicity and to avoid exposing all emails in 'to', we use BCC or individual calls.
        // Resend recommends sending individually or using 'bcc' for small lists.
        // Here we will use 'bcc' to send one email to everyone (limit 50 per batch usually, but let's keep it simple)
        // OR better: loop and send (slower but safer for personalization later).
        // Let's use BCC for now to save API calls.

        const emails = subscribers.map(s => s.email)

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Islamic Shop <newsletter@resend.dev>', // Update with your domain
                to: ['contact.pro.kenan@gmail.com'], // Send to admin
                bcc: emails, // Blind copy to all subscribers
                subject: subject,
                html: htmlContent,
            }),
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
