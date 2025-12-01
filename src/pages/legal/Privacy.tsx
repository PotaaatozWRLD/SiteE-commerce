export default function Privacy() {
    return (
        <>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px 40px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <h1 style={{ fontSize: '36px', marginBottom: '30px' }}>Politique de Confidentialité</h1>

                <div style={{ lineHeight: '1.6', color: '#374151' }}>
                    <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>1. Collecte de l'information</h2>
                    <p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, participez à un concours, et / ou lorsque vous vous déconnectez. Les informations recueillies incluent votre nom, votre adresse e-mail, numéro de téléphone, et / ou carte de crédit.</p>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>2. Utilisation des informations</h2>
                    <p>Toute les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                        <li>Fournir un contenu publicitaire personnalisé</li>
                        <li>Améliorer notre site Web</li>
                        <li>Améliorer le service client et vos besoins de prise en charge</li>
                        <li>Vous contacter par e-mail</li>
                        <li>Administrer un concours, une promotion, ou une enquête</li>
                    </ul>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>3. Confidentialité du commerce en ligne</h2>
                    <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.</p>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>4. Divulgation à des tiers</h2>
                    <p>Nous ne vendons, n'échangeons et ne transférons pas vos informations personnelles identifiables à des tiers. Cela ne comprend pas les tierce parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>5. Protection des informations</h2>
                    <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.</p>

                    <h2 style={{ fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>6. Consentement</h2>
                    <p>En utilisant notre site, vous consentez à notre politique de confidentialité.</p>
                </div>
            </div>
        </>
    )
}
