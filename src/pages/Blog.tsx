export default function Blog() {
    const posts = [
        {
            id: 1,
            title: "L'importance du Tapis de Prière",
            excerpt: "Plus qu'un simple objet, le tapis de prière délimite un espace sacré pour le croyant. Découvrez son histoire et comment bien le choisir.",
            date: "28 Nov 2024",
            category: "Spiritualité",
            image: "🕌",
            color: "#dcfce7",
            textColor: "#166534"
        },
        {
            id: 2,
            title: "L'Art du Parfum en Islam",
            excerpt: "Le parfum (Musc) tient une place particulière dans la tradition prophétique. Guide complet pour choisir sa fragrance.",
            date: "25 Nov 2024",
            category: "Lifestyle",
            image: "🌸",
            color: "#fce7f3",
            textColor: "#be185d"
        },
        {
            id: 3,
            title: "Les bienfaits du Dhikr",
            excerpt: "Le rappel d'Allah apaise les cœurs. Pourquoi et comment utiliser un Tasbih électronique ou traditionnel pour vos invocations.",
            date: "20 Nov 2024",
            category: "Pratique",
            image: "📿",
            color: "#e0f2fe",
            textColor: "#0369a1"
        },
        {
            id: 4,
            title: "Préparer le Ramadan",
            excerpt: "Conseils pratiques et spirituels pour se préparer à accueillir le mois béni dans les meilleures conditions.",
            date: "15 Nov 2024",
            category: "Saison",
            image: "🌙",
            color: "#fef3c7",
            textColor: "#b45309"
        }
    ]

    return (
        <>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 40px', fontFamily: 'Space Grotesk, sans-serif' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '48px', marginBottom: '20px', fontWeight: 700 }}>Le Journal</h1>
                    <p style={{ color: '#6b7280', fontSize: '20px', maxWidth: '600px', margin: '0 auto' }}>
                        Inspirations, conseils et réflexions pour accompagner votre quotidien spirituel.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
                    {posts.map(post => (
                        <article key={post.id} className="blog-card" style={{
                            border: '1px solid #f3f4f6',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            background: '#fff',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{
                                height: '240px',
                                background: post.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '80px',
                                position: 'relative'
                            }}>
                                <span style={{ transform: 'scale(1)', transition: 'transform 0.3s ease' }}>{post.image}</span>
                                <span style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255,255,255,0.9)',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: post.textColor
                                }}>
                                    {post.category}
                                </span>
                            </div>
                            <div style={{ padding: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>{post.date}</span>
                                    <span style={{ width: '4px', height: '4px', background: '#d1d5db', borderRadius: '50%' }}></span>
                                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>5 min de lecture</span>
                                </div>
                                <h2 style={{ fontSize: '24px', marginBottom: '12px', lineHeight: '1.3', fontWeight: 700, color: '#111827' }}>{post.title}</h2>
                                <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#166534',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    fontSize: '16px'
                                }}>
                                    Lire l'article
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <style>{`
                .blog-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                }
                .blog-card:hover button {
                    gap: 10px;
                }
            `}</style>
        </>
    )
}
