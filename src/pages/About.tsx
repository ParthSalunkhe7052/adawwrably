export function About() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <div className="text-center mb-16 mt-12">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wider mb-6 text-white text-shadow-sm">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-primary font-sans">
            Hey there, fellow fan! Welcome to Adawwrably! ✨
          </p>
        </div>

        <div className="space-y-16 text-muted-foreground font-sans leading-relaxed text-lg">
          
          <section className="bg-card p-8 md:p-12 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <p className="mb-6">
              Get ready to step into your happy place! 🏠 We're your go-to hub for all things kawaii, anime, and utterly adorable—from cuddly plushies and epic figures to surprise blind boxes and the coolest pins. We're all about that heart-skipping-a-beat feeling you get when you find a new treasure for your collection. 💝
            </p>
            <p className="font-semibold text-foreground">
              Think of us as your best friend in the anime merch world. 💖
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display uppercase tracking-wider text-foreground mb-6">
              📖 Our Story: Passion Turned Purpose
            </h2>
            <div className="space-y-4">
              <p>
                Fun fact: We started just like you! 🎯 Adawwrably was born in 2018 from a major passion for anime and a serious love for collectibles. It was all about that shared "AWW!" moment we feel when unboxing something perfect. 🎁
              </p>
              <p>
                We're incredibly proud and humbled that from those fan-fueled beginnings, we've grown into one of India's biggest anime merch brands! 🇮🇳 But no matter how big we get, our core remains the same: We are, and always will be, run by fans for fans. 🤝
              </p>
              <p>
                That means we're always tuned in to the latest anime, series, and trends 📺 — constantly updating our collections so you can rep your newest favorite character ASAP! Being the first to bring you the hottest collectibles is our jam 🎉, but we'll never forget the nostalgic classics we grew up watching on DisneyXD, Pogo, and Hungama 📡.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-display uppercase tracking-wider text-foreground mb-6">
              🛍️ Why Choose Us? We Speak Your Language!
            </h2>
            <p className="mb-6">
              We know collecting isn't just a hobby — it's a vibe! It's about storytelling, nostalgia, and the pure joy of the hunt. That's why we promise:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <strong className="text-foreground">Curated with Love:</strong> Every item is handpicked for top-notch quality and maximum cuteness. No fillers — just feel-good stuff!
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <strong className="text-foreground">First & Fastest:</strong> New episode = new merch obsession? We're on it! You'll often find the latest drops here first.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <strong className="text-foreground">For Every Fan & Budget:</strong> Whether you're just starting out or are a seasoned collector, we offer something for everyone. From daily dopamine hits to grail-level pieces — we've got you covered.
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-2xl">🤝</span>
                <div>
                  <strong className="text-foreground">Real Community Vibes:</strong> We're here to build a community, not just make a sale. Authentic products, authentic love.
                </div>
              </li>
            </ul>
          </section>

          <section className="text-center bg-card p-10 rounded-2xl border border-border/50">
            <h2 className="text-3xl font-display uppercase tracking-wider text-foreground mb-6">
              👥 Let's Build This Community Together!
            </h2>
            <p className="mb-4">
              Seriously — you, our amazing community, are the BEST part of this journey. Your unboxing videos, collection photos, and passionate DMs fuel our day! 🔥
            </p>
            <p className="mb-8">
              From our fan-family to yours: thank you for trusting us with your fandom. We can't wait to help you find your next absolute favorite thing. 💫
            </p>
            
            <p className="font-display text-2xl text-primary tracking-widest uppercase mt-12 mb-2">
              Ready to explore? Let's go! 🛒
            </p>
            <p className="italic text-foreground">
              With love and endless anime marathons,
            </p>
            <p className="font-bold text-foreground mt-1">
              Team Adawwrably 🎌
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
