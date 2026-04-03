import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

// IMAGES
import logo from './assets/logo.png'
import coffee from './assets/coffee.png'
import mocha from './assets/mocha.png'
import chai from './assets/chai.png'
import matcha from './assets/matcha.png'
import coldbrew from './assets/vanilla.png'
import breakfast from './assets/breakfast.png'
import wrap from './assets/wraps.png'
import bakery from './assets/bakery.png'
import pupcup from './assets/dog-cafe.png'
import pawccino from './assets/pawccino.png'
import dogtreat from './assets/dog-treat.png'
import cheddar from './assets/cheddar.png'
import banner from './assets/banner.png'
import storefront from './assets/storefront.png'
import premium from './assets/premium.png'
import interior from './assets/interior.png'
import staff from './assets/staff.png'

const coffeeMenu = [
  {
    name: 'Mocha',
    price: '$5.95',
    desc: 'Chocolate, espresso, and milk blended into a comforting classic.',
    longDesc:
      'A smooth mocha made with rich espresso, velvety chocolate, and creamy milk for a warm, comforting sip with dessert energy.',
    image: mocha,
    category: 'Coffee',
  },
  {
    name: 'Caramel Latte',
    price: '$5.75',
    desc: 'Espresso, steamed milk, and caramel for a sweet cozy favorite.',
    longDesc:
      'A customer favorite with espresso, caramel sweetness, and silky steamed milk that fits Bub’s warm cocoa-toned café vibe perfectly.',
    image: premium,
    category: 'Coffee',
  },
  {
    name: 'Matcha Latte',
    price: '$5.95',
    desc: 'Earthy matcha balanced with lightly sweet steamed milk.',
    longDesc:
      'Bright matcha flavor paired with smooth milk for a fresh, balanced drink that feels premium without being too heavy.',
    image: matcha,
    category: 'Coffee',
  },
  {
    name: 'Vanilla Cold Brew',
    price: '$5.25',
    desc: 'Bold cold brew with vanilla cream and a mellow finish.',
    longDesc:
      'A chilled, bold cold brew softened with vanilla cream for an easy, refreshing drink that still keeps strong coffee character.',
    image: coldbrew,
    category: 'Coffee',
  },
  {
    name: 'Chai Latte',
    price: '$5.50',
    desc: 'Spiced chai and creamy milk with a soft cinnamon warmth.',
    longDesc:
      'Cozy chai spices, creamy milk, and a warm café finish make this a go-to comfort drink for slow mornings or cool afternoons.',
    image: chai,
    category: 'Coffee',
  },
  {
    name: 'House Brew',
    price: '$3.50',
    desc: 'Smooth, rich drip coffee with a warm cocoa finish.',
    longDesc:
      'Bub’s simple classic: rich house coffee brewed fresh and served smooth, balanced, and easy to drink throughout the day.',
    image: coffee,
    category: 'Coffee',
  },
]

const breakfastMenu = [
  {
    name: 'Breakfast Sandwich',
    price: '$7.95',
    desc: 'A warm, satisfying breakfast favorite made for busy mornings.',
    longDesc:
      'A hearty café-style breakfast sandwich that feels filling, familiar, and easy to grab when you want something warm with your drink.',
    image: breakfast,
    category: 'Breakfast',
  },
  {
    name: 'Breakfast Wrap',
    price: '$8.50',
    desc: 'A hearty wrap option with a café-style grab-and-go feel.',
    longDesc:
      'A flavorful breakfast wrap with a satisfying café feel, built for mornings when you want something quick without feeling cheap.',
    image: wrap,
    category: 'Breakfast',
  },
  {
    name: 'Bakery Selection',
    price: '$4.25',
    desc: 'Fresh pastries and baked treats that pair perfectly with coffee.',
    longDesc:
      'A rotating bakery-style offering that adds softness, sweetness, and a classic coffee-shop pairing to the morning lineup.',
    image: bakery,
    category: 'Breakfast',
  },
]

const dogMenu = [
  {
    name: 'Pup Cup',
    price: '$2.50',
    desc: 'Whipped cream treat topped with a crunchy biscuit.',
    longDesc:
      'A small dog-friendly treat made for quick joy at the café, topped with a biscuit and served as an easy reward for good pups.',
    image: pupcup,
    category: 'Dog Menu',
  },
  {
    name: 'Peanut Butter Biscuit',
    price: '$3.25',
    desc: 'Dog-friendly biscuit with peanut butter flavor pups love.',
    longDesc:
      'A café treat with a dog-friendly peanut butter flavor that makes Bub’s pet menu feel intentional instead of gimmicky.',
    image: dogtreat,
    category: 'Dog Menu',
  },
  {
    name: "Bub's Pawccino",
    price: '$4.00',
    desc: 'A pet-safe creamy treat made just for four-legged regulars.',
    longDesc:
      'A signature pup treat made for dogs who deserve their own coffee-run experience, served with playful branding and café charm.',
    image: pawccino,
    category: 'Dog Menu',
  },
  {
    name: 'Cheddar Bites',
    price: '$3.75',
    desc: 'Soft baked savory bites perfect for a quick snack.',
    longDesc:
      'Savory dog-friendly bites that add variety to the pet menu and make the dog section feel like a real offering, not an afterthought.',
    image: cheddar,
    category: 'Dog Menu',
  },
]

const galleryImages = [
  { src: storefront, alt: "Bub's Coffee Shop storefront" },
  { src: banner, alt: "Bub's Coffee Shop banner" },
  { src: interior, alt: "Interior of Bub's Coffee Shop" },
  { src: bakery, alt: "Bakery at Bub's Coffee Shop" },
]

const reviews = [
  {
    name: 'Maya R.',
    text: 'The space feels warm and inviting, and the dog menu is such a cute touch.',
  },
  {
    name: 'Jordan T.',
    text: 'Finally a coffee shop that feels like a real neighborhood spot and not just a photo set.',
  },
  {
    name: 'Cam S.',
    text: 'Great drinks, cozy seating, and my dog was treated like a VIP.',
  },
]

const startupStats = [
  { value: '4.9★', label: 'Neighborhood favorite' },
  { value: '7am–6pm', label: 'Open daily' },
  { value: 'Pet Friendly', label: 'Comfort-first experience' },
]

const experienceSteps = [
  {
    title: 'Order your favorite',
    text: 'Coffee, breakfast, and signature drinks made for quick stops or slow mornings.',
  },
  {
    title: 'Settle in comfortably',
    text: 'Cozy seating, reliable Wi-Fi, and a polished café atmosphere built to feel easy.',
  },
  {
    title: 'Bring Bub too',
    text: 'A real dog menu makes the pet-friendly experience feel intentional, not gimmicky.',
  },
]

function MenuCard({ item, onOpen, className = 'menu-card image-card reveal', delay = 0 }) {
  return (
    <button
      type="button"
      className={`card-button ${className}`}
      onClick={() => onOpen(item)}
      aria-label={`View details for ${item.name}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-content">
        <div className="menu-top">
          <h3>{item.name}</h3>
          <span>{item.price}</span>
        </div>
        <p>{item.desc}</p>
      </div>
    </button>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedItem, setSelectedItem] = useState(null)
  const [pageLoaded, setPageLoaded] = useState(false)

  const allItems = useMemo(() => [...coffeeMenu, ...breakfastMenu, ...dogMenu], [])

  useEffect(() => {
    const t = window.setTimeout(() => setPageLoaded(true), 80)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.55, 0.75],
        rootMargin: '-15% 0px -55% 0px',
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedItem) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedItem])

  const getRelatedItems = (item) => {
    return allItems
      .filter((entry) => entry.category === item.category && entry.name !== item.name)
      .slice(0, 2)
  }

  return (
    <div className={`site-shell page-fade ${pageLoaded ? 'is-loaded' : ''}`}>
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#home" className="brand">
            <img src={logo} alt="Bub's Coffee Shop logo" className="brand-logo" />
            <div>
              <h1>Bub&apos;s Coffee Shop</h1>
              <p>Coffee for you. Treats for Bub.</p>
            </div>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#menu" className={activeSection === 'menu' ? 'is-active' : ''}>
              Menu
            </a>
            <a href="#dogs" className={activeSection === 'dogs' ? 'is-active' : ''}>
              Dog Menu
            </a>
            <a href="#gallery" className={activeSection === 'gallery' ? 'is-active' : ''}>
              Gallery
            </a>
            <a href="#about" className={activeSection === 'about' ? 'is-active' : ''}>
              About
            </a>
            <a href="#visit" className="nav-btn">
              Visit Us
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="announcement-bar">
          <div className="container announcement-wrap">
            <span className="announcement-pill">Popular This Week</span>
            <p>Bub&apos;s Signature Caramel Freeze is the current customer favorite.</p>
          </div>
        </section>

        <section className="hero compact-section" id="home">
          <div className="container hero-stack">
            <div className="hero-copy reveal" data-reveal="left">
              <span className="eyebrow">Premium Cozy Café • Pet Friendly • Chicago</span>
              <h2>Coffee worth the stop. A space worth staying in.</h2>
              <p>
                Bub&apos;s blends premium café energy with a warm neighborhood feel — crafted
                drinks, breakfast favorites, dog-friendly treats, and a polished space made for
                both quick coffee runs and slow mornings.
              </p>

              <div className="hero-actions">
                <a href="#menu" className="btn btn-primary">
                  View Menu
                </a>
                <a href="#visit" className="btn btn-secondary">
                  Visit Today
                </a>
              </div>

              <div className="hero-proof-inline">
                <div className="proof-chip">4.9★ local feel</div>
                <div className="proof-chip">Free Wi-Fi</div>
                <div className="proof-chip">Dog menu available</div>
              </div>
            </div>

            <div className="hero-team-card reveal" data-reveal="right">
              <div className="hero-team-header">
                <span className="hero-team-tag">Meet the Team</span>
                <div className="hero-team-copy">
                  <strong>Warm service. Real neighborhood energy.</strong>
                  <p>People-first hospitality for coffee runs, work blocks, and pup visits.</p>
                </div>
              </div>

              <div className="hero-team-photo-wrap">
                <img
                  src={staff}
                  alt="Bub's Coffee Shop staff welcoming guests"
                  className="hero-team-photo"
                />
              </div>

              <div className="hero-team-footer">
                <div className="hero-team-pill">Welcoming staff</div>
                <div className="hero-team-pill">Neighborhood feel</div>
                <div className="hero-team-pill">Pet-friendly hospitality</div>
              </div>
            </div>
          </div>

          <div className="container hero-stats-row reveal" data-reveal="up">
            {startupStats.map((stat, index) => (
              <div
                className="hero-stat-card hero-stat-row-card"
                key={stat.label}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="compact-section trust-section reveal" data-reveal="up">
          <div className="container">
            <div className="trust-banner">
              <div className="trust-quote">
                <span className="section-tag">Customer Love</span>
                <p>
                  “Best coffee spot in the neighborhood — warm, polished, and one of the few places
                  where bringing your dog actually feels natural.”
                </p>
                <strong>— Jordan T.</strong>
              </div>

              <div className="trust-details">
                <div className="trust-detail">
                  <span>📍</span>
                  <div>
                    <strong>Chicago, IL</strong>
                    <p>Neighborhood café feel with city charm.</p>
                  </div>
                </div>

                <div className="trust-detail">
                  <span>🕒</span>
                  <div>
                    <strong>Open Daily 7am – 6pm</strong>
                    <p>Built for early stops, midday resets, and slow afternoons.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-section reveal" data-reveal="up">
          <div className="container hero-amenities-bar">
            <div className="amenities-header">
              <span className="section-tag">Guest Comfort</span>
              <h3>Everything guests need to settle in and stay awhile.</h3>
            </div>

            <div className="amenities-bar-grid">
              <div className="amenity-bar-item">
                <span className="amenity-icon">📶</span>
                <div>
                  <strong>Free Wi-Fi</strong>
                  <p>Reliable internet for work sessions, study time, or casual browsing.</p>
                </div>
              </div>

              <div className="amenity-bar-item">
                <span className="amenity-icon">🌿</span>
                <div>
                  <strong>Air-purified atmosphere</strong>
                  <p>
                    Clean-air filtration helps reduce pet hair and everyday odors for a fresher,
                    more comfortable café experience.
                  </p>
                </div>
              </div>

              <div className="amenity-bar-item">
                <span className="amenity-icon">🪑</span>
                <div>
                  <strong>Cozy seating</strong>
                  <p>Perfect for catch-ups, laptop time, or a slow morning coffee break.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-section experience-section reveal" data-reveal="up">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>The Bub&apos;s Experience</span>
              <h2>Built like a favorite local spot, not just a pretty café.</h2>
              <p>Thoughtful details that make the visit feel polished, easy, and memorable.</p>
            </div>

            <div className="experience-grid">
              {experienceSteps.map((step, index) => (
                <article
                  className="experience-card reveal"
                  data-reveal="up"
                  key={step.title}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <span className="experience-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-section compact-section reveal" data-reveal="scale">
          <div className="container">
            <div className="featured-card featured-premium">
              <div className="featured-image-wrap">
                <img
                  src={premium}
                  alt="Bub's Signature Caramel Freeze"
                  className="featured-image"
                />
              </div>

              <div className="featured-copy">
                <span className="section-tag">House Favorite</span>
                <h2>Bub&apos;s Signature Caramel Freeze</h2>
                <p className="featured-price">$6.95</p>
                <p>
                  A rich, creamy signature drink finished with whipped cream, caramel drizzle,
                  and a smooth dessert-like finish that feels indulgent in the best way.
                </p>

                <div className="featured-highlights">
                  <span>Popular this week</span>
                  <span>Sweet caramel finish</span>
                  <span>Premium house pick</span>
                </div>

                <div className="featured-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setSelectedItem({
                        name: "Bub's Signature Caramel Freeze",
                        price: '$6.95',
                        desc: 'A rich, creamy signature drink finished with whipped cream, caramel drizzle, and a smooth dessert-like finish.',
                        longDesc:
                          'This featured house favorite is built to feel like a premium dessert drink: creamy texture, caramel sweetness, whipped topping, and a polished café presentation that fits the brand perfectly.',
                        image: premium,
                        category: 'Featured Drink',
                      })
                    }
                  >
                    See Details
                  </button>
                  <a href="#visit" className="btn btn-secondary">
                    Stop By Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-section alt-section reveal" data-reveal="left" id="menu">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>Signature Drinks</span>
              <h2>Coffee Menu</h2>
              <p>Comforting favorites with a polished café feel.</p>
            </div>

            <div className="image-menu-grid">
              {coffeeMenu.map((item, index) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  onOpen={setSelectedItem}
                  delay={index * 80}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="compact-section breakfast-section reveal" data-reveal="right">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>Morning Favorites</span>
              <h2>Breakfast & Bakery</h2>
              <p>Fresh food options that make Bub&apos;s feel like a real café stop.</p>
            </div>

            <div className="feature-grid">
              {breakfastMenu.map((item, index) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  onOpen={setSelectedItem}
                  className="feature-card reveal"
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="compact-section alt-section reveal" data-reveal="left" id="dogs">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>For Bub and Friends</span>
              <h2>Dog Menu</h2>
              <p>Because good dogs deserve their own coffee run too.</p>
            </div>

            <div className="dog-grid">
              {dogMenu.map((item, index) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  onOpen={setSelectedItem}
                  className="dog-card image-card reveal"
                  delay={index * 80}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="compact-section gallery-section reveal" data-reveal="scale" id="gallery">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>See the Space</span>
              <h2>Bub&apos;s Gallery</h2>
              <p>Warm tones, polished branding, and a space designed to feel inviting.</p>
            </div>

            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <article
                  className={`gallery-card gallery-card-${index + 1} reveal`}
                  data-reveal="up"
                  key={image.alt}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compact-section alt-section reveal" data-reveal="right" id="about">
          <div className="container about-grid">
            <div className="about-card reveal" data-reveal="left">
              <span className="section-tag">About Bub&apos;s</span>
              <h2>A premium cozy café with real neighborhood character.</h2>
              <p>
                Bub&apos;s Coffee Shop was imagined as a café that feels polished without feeling
                cold — warm textures, quality drinks, breakfast favorites, and a pet-friendly
                atmosphere that still feels elevated.
              </p>
              <p>
                The goal is simple: create a place people want to return to, whether they&apos;re
                stopping in for coffee, meeting a friend, working for an hour, or bringing Bub
                along for the experience.
              </p>
            </div>

            <div className="about-panel">
              <div
                className="about-feature reveal"
                data-reveal="up"
                style={{ transitionDelay: '0ms' }}
              >
                <h3>Warm Interior</h3>
                <p>Soft browns, creamy neutrals, and layered textures that feel thoughtful.</p>
              </div>
              <div
                className="about-feature reveal"
                data-reveal="up"
                style={{ transitionDelay: '90ms' }}
              >
                <h3>Pet-Friendly, Done Right</h3>
                <p>Dogs feel welcome without the space feeling themed or overdone.</p>
              </div>
              <div
                className="about-feature reveal"
                data-reveal="up"
                style={{ transitionDelay: '180ms' }}
              >
                <h3>Made to Return To</h3>
                <p>A polished everyday café experience, not a one-time novelty stop.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="compact-section reviews-section reveal" data-reveal="up">
          <div className="container">
            <div className="section-heading reveal" data-reveal="up">
              <span>Customer Love</span>
              <h2>What People Are Saying</h2>
            </div>

            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <article
                  className="review-card reveal"
                  data-reveal="up"
                  key={review.name}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <p>&ldquo;{review.text}&rdquo;</p>
                  <h3>{review.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="compact-section cta-section reveal" data-reveal="scale" id="visit">
          <div className="container visit-card">
            <div className="visit-copy reveal" data-reveal="left">
              <span className="section-tag">Visit Bub&apos;s</span>
              <h2>Stop in for a drink, stay for the experience.</h2>
              <p>
                Come by for a signature coffee, a breakfast favorite, and a space that feels warm,
                polished, and genuinely welcoming to both people and pups.
              </p>

              <div className="visit-cta-buttons">
                <a href="#menu" className="btn btn-primary">
                  Browse Menu
                </a>
                <a href="#gallery" className="btn btn-secondary visit-btn-light">
                  See the Space
                </a>
              </div>
            </div>

            <div className="visit-details">
              <div className="visit-row reveal" data-reveal="up" style={{ transitionDelay: '0ms' }}>
                <span className="visit-label">📍</span>
                <div>
                  <strong>Chicago, IL</strong>
                  <p>Neighborhood café feel with city charm.</p>
                </div>
              </div>

              <div className="visit-row reveal" data-reveal="up" style={{ transitionDelay: '90ms' }}>
                <span className="visit-label">🕒</span>
                <div>
                  <strong>Open Daily 7am – 6pm</strong>
                  <p>Perfect for coffee runs, quiet work blocks, and afternoon resets.</p>
                </div>
              </div>

              <div className="visit-row reveal" data-reveal="up" style={{ transitionDelay: '180ms' }}>
                <span className="visit-label">📞</span>
                <div>
                  <strong>(312) 555-0192</strong>
                  <p>Call ahead for questions, café details, or pet-friendly information.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-wrap">
          <p>© 2026 Bub&apos;s Coffee Shop. Crafted with warmth, coffee, and dog-friendly charm.</p>
        </div>
      </footer>

      {selectedItem &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
            <div
              className="modal-card"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-item-title"
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close details"
              >
                ×
              </button>

              <div className="modal-media">
                <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
              </div>

              <div className="modal-copy">
                <span className="modal-category">{selectedItem.category}</span>
                <h2 id="menu-item-title">{selectedItem.name}</h2>
                <p className="modal-price">{selectedItem.price}</p>
                <p className="modal-description">{selectedItem.longDesc}</p>

                {selectedItem.category !== 'Featured Drink' && (
                  <div className="modal-related">
                    <h3>More from this section</h3>
                    <div className="modal-related-list">
                      {getRelatedItems(selectedItem).map((item) => (
                        <button
                          type="button"
                          className="related-chip"
                          key={item.name}
                          onClick={() => setSelectedItem(item)}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <a
                    href="#visit"
                    className="btn btn-primary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Visit Bub&apos;s
                  </a>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default App