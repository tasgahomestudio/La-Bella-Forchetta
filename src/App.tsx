import  React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import  { Moon, Sun, Globe, CheckCircle, CalendarCheck, Mail, Phone, MapPin, Star, Clock, Award, ChefHat, Facebook, Instagram, Twitter, Menu, X } from 'lucide-react'; 
import { motion } from 'framer-motion'; 

const SUPABASE_URL = 'https://xxx.supabase.co';
const SUPABASE_ANON_KEY = 'public-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const  translations = {
  fr: {
    nav: ['Accueil', 'À propos', 'Carte', 'Avis', 'Contact', 'Réserver'], 
    heroTitle: "Le goût de l'Italie au cœur de Paris",
    heroDesc: "Découvrez notre cuisine italienne authentique, fraîche et savoureuse.",
    aboutTitle: "À propos",
    aboutDesc: "La Bella Forchetta, c'est une invitation à voyager en Italie sans quitter Paris. Nos plats sont préparés avec amour, à base de produits frais et de recettes traditionnelles.",
       menuTitle: "Notre Carte",
    menuCategories: {
      antipasti: {
        title: "Antipasti",
        items: [
          { title: "Bruschetta Classique", desc: "Pain grillé, tomates fraîches, basilic, ail", price: "8€" },
          { title: "Burrata di Puglia", desc: "Mozzarella crémeuse, roquette, tomates cerises", price: "14€" },
          { title: "Antipasti Misti", desc: "Charcuterie, fromages, légumes marinés", price: "18€" }
        ]
      },
      pasta: {
        title: "Pasta & Risotti",
        items: [
          { title: "Spaghetti Carbonara", desc: "Œufs, pancetta, pecorino, poivre noir", price: "16€" },
          { title: "Penne Arrabbiata", desc: "Sauce tomate épicée, ail, piment", price: "14€" },
          { title: "Risotto aux Cèpes", desc: "Riz Carnaroli, champignons, parmesan", price: "18€" },
          { title: "Lasagne della Casa", desc: "Viande, béchamel, parmesan, basilic", price: "17€" }
        ]
      },
      pizza: {
        title: "Pizze",
        items: [
          { title: "Margherita", desc: "Mozzarella, tomates, basilic frais", price: "13€" },
          { title: "Quattro Stagioni", desc: "Jambon, champignons, artichauts, olives", price: "16€" },
          { title: "Diavola", desc: "Mozzarella, tomates, salami piquant", price: "15€" },
          { title: "Prosciutto e Funghi", desc: "Jambon de Parme, champignons frais", price: "17€" }
        ]
      },
      desserts: {
        title: "Dolci",
        items: [
          { title: "Tiramisu", desc: "Mascarpone, café, cacao amer", price: "7€" },
          { title: "Panna Cotta", desc: "Crème vanille, coulis fruits rouges", price: "6€" },
          { title: "Cannoli Siciliani", desc: "Ricotta, pistaches, chocolat", price: "8€" }
        ]
      }
    },
    hours: {
      title: "Horaires d'ouverture",
      schedule: [
        { day: "Lundi - Jeudi", hours: "12h00 - 14h30 / 19h00 - 23h00" },
        { day: "Vendredi - Samedi", hours: "12h00 - 14h30 / 19h00 - 00h00" },
        { day: "Dimanche", hours: "12h00 - 15h00 / 19h00 - 22h30" }
      ]
    },
    awards: {
      title: "Récompenses",
      items: [
        "Tripadvisor Certificate of Excellence 2024",
        "Meilleur Restaurant Italien - TimeOut Paris 2023",
        "4.8/5 étoiles Google Reviews"
      ]
    }, 
       testimonialsTitle: "Avis Google",
    testimonials: [
      { name: "Marie L.", review: "Excellente cuisine italienne ! Les pâtes sont parfaites et l'ambiance chaleureuse.", rating: 5, date: "Il y a 2 jours" },
      { name: "Pierre D.", review: "Service impeccable et tiramisu exceptionnel. Je recommande vivement !", rating: 5, date: "Il y a 1 semaine" },
      { name: "Sofia M.", review: "Authentique restaurant italien à Paris. Les pizzas sont cuites au feu de bois.", rating: 5, date: "Il y a 2 semaines" },
      { name: "Thomas R.", review: "Ambiance familiale et plats délicieux. Un vrai voyage en Italie !", rating: 5, date: "Il y a 3 semaines" }
    ],
    googleRating: "4.8",
    totalReviews: "324", 
    contactTitle: "Contactez-nous",
    address: "12 Rue de l'Italie, 75001 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@labellaforchetta.fr",
    reservationTitle: "Réservez votre table",
    placeholders: {
      nom: "Nom complet",
      email: "Adresse email",
      tel: "Numéro de téléphone",
      date: "Date de réservation",
      message: "Message ou demande spéciale...",
    },
    buttons: {
      reserver: "Réserver",
      darkMode: "Mode sombre",
      lightMode: "Mode clair",
      language: "Langue",
    },
    successMsg: "Réservation envoyée avec succès !",
    errorMsg: "Une erreur est survenue, veuillez réessayer.",
  },
   en: {
    nav: ['Home', 'About', 'Menu', 'Reviews', 'Contact', 'Reserve'], 
    heroTitle: "Taste Italy in the heart of Paris",
    heroDesc: "Discover our authentic, fresh, and delicious Italian cuisine.",
    aboutTitle: "About Us",
    aboutDesc: "La Bella Forchetta invites you to travel to Italy without leaving Paris. Our dishes are lovingly prepared with fresh ingredients and traditional recipes.",
       menuTitle: "Our Menu",
    menuCategories: {
      antipasti: {
        title: "Antipasti",
        items: [
          { title: "Classic Bruschetta", desc: "Grilled bread, fresh tomatoes, basil, garlic", price: "8€" },
          { title: "Burrata di Puglia", desc: "Creamy mozzarella, arugula, cherry tomatoes", price: "14€" },
          { title: "Mixed Antipasti", desc: "Cured meats, cheeses, marinated vegetables", price: "18€" }
        ]
      },
      pasta: {
        title: "Pasta & Risotti",
        items: [
          { title: "Spaghetti Carbonara", desc: "Eggs, pancetta, pecorino, black pepper", price: "16€" },
          { title: "Penne Arrabbiata", desc: "Spicy tomato sauce, garlic, chili", price: "14€" },
          { title: "Porcini Risotto", desc: "Carnaroli rice, mushrooms, parmesan", price: "18€" },
          { title: "House Lasagna", desc: "Meat, béchamel, parmesan, basil", price: "17€" }
        ]
      },
      pizza: {
        title: "Pizze",
        items: [
          { title: "Margherita", desc: "Mozzarella, tomatoes, fresh basil", price: "13€" },
          { title: "Quattro Stagioni", desc: "Ham, mushrooms, artichokes, olives", price: "16€" },
          { title: "Diavola", desc: "Mozzarella, tomatoes, spicy salami", price: "15€" },
          { title: "Prosciutto e Funghi", desc: "Parma ham, fresh mushrooms", price: "17€" }
        ]
      },
      desserts: {
        title: "Dolci",
        items: [
          { title: "Tiramisu", desc: "Mascarpone, coffee, bitter cocoa", price: "7€" },
          { title: "Panna Cotta", desc: "Vanilla cream, red berry coulis", price: "6€" },
          { title: "Cannoli Siciliani", desc: "Ricotta, pistachios, chocolate", price: "8€" }
        ]
      }
    },
    hours: {
      title: "Opening Hours",
      schedule: [
        { day: "Monday - Thursday", hours: "12:00 - 14:30 / 19:00 - 23:00" },
        { day: "Friday - Saturday", hours: "12:00 - 14:30 / 19:00 - 00:00" },
        { day: "Sunday", hours: "12:00 - 15:00 / 19:00 - 22:30" }
      ]
    },
    awards: {
      title: "Awards",
      items: [
        "Tripadvisor Certificate of Excellence 2024",
        "Best Italian Restaurant - TimeOut Paris 2023",
        "4.8/5 stars Google Reviews"
      ]
    }, 
       testimonialsTitle: "Google Reviews",
    testimonials: [
      { name: "Marie L.", review: "Excellent Italian cuisine! The pasta is perfect and the atmosphere is warm.", rating: 5, date: "2 days ago" },
      { name: "Pierre D.", review: "Impeccable service and exceptional tiramisu. Highly recommend!", rating: 5, date: "1 week ago" },
      { name: "Sofia M.", review: "Authentic Italian restaurant in Paris. The pizzas are wood-fired.", rating: 5, date: "2 weeks ago" },
      { name: "Thomas R.", review: "Family atmosphere and delicious dishes. A real trip to Italy!", rating: 5, date: "3 weeks ago" }
    ],
    googleRating: "4.8",
    totalReviews: "324", 
    contactTitle: "Contact Us",
    address: "12 Rue de l'Italie, 75001 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@labellaforchetta.fr",
    reservationTitle: "Book Your Table",
    placeholders: {
      nom: "Full Name",
      email: "Email Address",
      tel: "Phone Number",
      date: "Reservation Date",
      message: "Message or special requests...",
    },
    buttons: {
      reserver: "Reserve",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      language: "Language",
    },
    successMsg: "Reservation sent successfully!",
    errorMsg: "An error occurred, please try again.",
  },
  it: {
    nav: ['Home', 'Chi siamo', 'Menu', 'Recensioni', 'Contatti', 'Prenota'],
    heroTitle: "Il gusto dell'Italia nel cuore di Parigi",
    heroDesc: "Scopri la nostra cucina italiana autentica, fresca e gustosa.",
    aboutTitle: "Chi siamo",
    aboutDesc: "La Bella Forchetta è un invito a viaggiare in Italia senza lasciare Parigi. I nostri piatti sono preparati con amore, con ingredienti freschi e ricette tradizionali.",
    menuTitle: "Il nostro Menu",
    menuItems: [
      { title: "Pizza Margherita", desc: "Un classico della cucina italiana, rivisitato con ingredienti di qualità." },
      { title: "Pasta Carbonara", desc: "Pasta cremosa con pancetta croccante e parmigiano." },
      { title: "Risotto ai funghi", desc: "Risotto cremoso con funghi selvatici." },
      { title: "Lasagne fatte in casa", desc: "Lasagne tradizionali con salsa besciamella fatta in casa." },
      { title: "Tiramisu", desc: "Classico dolce italiano al caffè e mascarpone." },
      { title: "Panna Cotta", desc: "Crema cotta dolce con coulis di frutti rossi." },
    ],
    testimonialsTitle: "Recensioni dei clienti",
    testimonials: [
      "Una vera delizia!",
      "Servizio impeccabile e piatti deliziosi.",
      "Il miglior tiramisù di Parigi!",
    ],
    contactTitle: "Contattaci",
    address: "12 Rue de l'Italie, 75001 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@labellaforchetta.fr",
    reservationTitle: "Prenota il tuo tavolo",
    placeholders: {
      nom: "Nome completo",
      email: "Indirizzo email",
      tel: "Numero di telefono",
      date: "Data della prenotazione",
      message: "Messaggio o richieste speciali...",
    },
    buttons: {
      reserver: "Prenota",
      darkMode: "Modalità scura",
      lightMode: "Modalità chiara",
      language: "Lingua",
    },
    successMsg: "Prenotazione inviata con successo!",
    errorMsg: "Si è verificato un errore, riprova.",
  },
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('fr');
  const [form, setForm] = useState({
    nom: '',
    email: '',
    tel: '',
    date: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
   const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const t = translations[lang as keyof typeof translations];

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      let { error } = await supabase.from('reservations').insert([
        {
          nom: form.nom,
          email: form.email,
          telephone: form.tel,
          date_reservation: form.date,
          message: form.message,
        },
      ]);
      if (error) throw error;
      setFeedback({ type: 'success', message: t.successMsg });
      setForm({ nom: '', email: '', tel: '', date: '', message: '' });
    } catch (err) {
      setFeedback({ type: 'error', message: t.errorMsg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} transition-colors duration-500 font-sans`}>
           <nav className="flex justify-between items-center px-4 sm:px-8 py-4 shadow-lg sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-red-100 dark:border-red-900"> 
               <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2 cursor-default select-none hover:scale-105 transition-transform duration-300"
        >
          <div className="relative">
            <div className="text-3xl">🍝</div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent italic">
            La Bella Forchetta
          </h1>
        </motion.div> 
               <ul className="hidden md:flex items-center gap-6 text-sm font-semibold"> 
                   {t.nav.map((label, i) => {
            const sections = ['accueil', 'apropos', 'carte', 'avis', 'contact', 'reservation'];
            return (
              <li key={i}>
                <a
                  href={`#${sections[i]}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sections[i])?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:scale-110 relative group cursor-pointer"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            );
          })} 
          <li>
                       <motion.button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? t.buttons.lightMode : t.buttons.darkMode}
              className="p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            > 
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                       </motion.button> 
          </li>
          <li className="relative group">
                       <motion.button 
              className="flex items-center gap-1 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            > 
              <Globe size={18} />
              <span>{lang.toUpperCase()}</span>
                       </motion.button> 
            <ul className="absolute top-full mt-1 right-0 bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
              {['fr', 'en', 'it'].map((code) => (
                <li key={code}>
                  <button
                    onClick={() => setLang(code)}
                    className={`block px-4 py-2 w-full text-left hover:bg-red-600 hover:text-white ${
                      lang === code ? 'font-bold underline' : ''
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </li>
               </ul>

        <button
          className="md:hidden p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-red-100 dark:border-red-900 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {t.nav.map((label, i) => {
                const sections = ['accueil', 'apropos', 'carte', 'avis', 'contact', 'reservation'];
                return (
                  <a
                    key={i}
                    href={`#${sections[i]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(sections[i])?.scrollIntoView({ behavior: 'smooth' });
                      setMobileMenuOpen(false);
                    }}
                    className="block py-2 text-lg font-semibold hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    {label}
                  </a>
                );
              })}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <div className="flex gap-2">
                  {['fr', 'en', 'it'].map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        lang === code
                          ? 'bg-red-600 text-white'
                          : 'hover:bg-red-100 dark:hover:bg-red-900'
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav> 

      <section
               id="accueil"
        className="relative bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center h-screen flex items-center justify-center text-white overflow-hidden" 
      >
               <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.8 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center bg-black/60 backdrop-blur-sm p-4 sm:p-8 rounded-2xl max-w-3xl mx-4 shadow-2xl border border-white/20"
        > 
                   <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          >
            {t.heroTitle}
          </motion.h2> 
                   <motion.p 
            className="text-sm sm:text-lg mb-6 drop-shadow-md text-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {t.heroDesc}
          </motion.p> 
                   <motion.a
            href="#reservation"
            className="inline-block bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.buttons.reserver}
          </motion.a> 
        </motion.div>
      </section>

           <motion.section 
        id="apropos" 
        className="py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      > 
               <motion.h3 
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          viewport={{ once: true }}
        >
          {t.aboutTitle}
        </motion.h3> 
                      <motion.p 
          className="text-lg text-center max-w-3xl mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.aboutDesc}
        </motion.p>
        
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
                   <h4 className="text-xl sm:text-2xl font-bold text-center mb-8 text-red-600 dark:text-red-400">Notre Équipe</h4>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8"> 
            <motion.div
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative mb-4">
                               <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80" 
                  alt="Chef Marco" 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow border-4 border-red-200 dark:border-red-800"
                /> 
                <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-full">
                  <ChefHat size={20} />
                </div>
              </div>
                           <h5 className="text-sm sm:text-lg font-semibold">Chef Marco</h5>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Chef Exécutif</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">25 ans d'expérience</p> 
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative mb-4">
                               <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=300&q=80" 
                  alt="Giulia" 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow border-4 border-red-200 dark:border-red-800"
                /> 
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full">
                  <Star size={20} />
                </div>
              </div>
                           <h5 className="text-sm sm:text-lg font-semibold">Giulia</h5>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Manager</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Accueil chaleureux</p> 
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative mb-4">
                               <img 
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80" 
                  alt="Pietro" 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow border-4 border-red-200 dark:border-red-800"
                /> 
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full">
                  <CheckCircle size={20} />
                </div>
              </div>
                           <h5 className="text-sm sm:text-lg font-semibold">Pietro</h5>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Sommelier</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Expertise des vins</p> 
            </motion.div>
          </div>
        </motion.div> 
      </motion.section> 

                <motion.section 
        id="carte" 
        className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      > 
        <motion.h3 
          className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-16 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.menuTitle}
        </motion.h3> 
        <div className="max-w-7xl mx-auto">
          {Object.entries(t.menuCategories).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
                           <h4 className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mb-6 sm:mb-8 text-center border-b-2 border-red-200 dark:border-red-800 pb-4">
                {category.title}
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6"> 
                {category.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500"
                    whileHover={{ scale: 1.02, y: -5 }}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h5 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400">{item.title}</h5>
                      <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mt-1 sm:mt-0">{item.price}</span>
                    </div> 
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

           <motion.section 
        className="py-12 sm:py-20 px-4 sm:px-8 bg-white dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12"> 
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
                       <h3 className="text-xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {t.hours.title}
            </h3> 
            <div className="space-y-4">
              {t.hours.schedule.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-semibold">{item.day}</span>
                  <span className="text-red-600 dark:text-red-400">{item.hours}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
                       <h3 className="text-xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {t.awards.title}
            </h3> 
            <div className="space-y-4">
              {t.awards.items.map((award, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Award className="text-yellow-500" size={24} />
                  <span className="text-sm">{award}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>  

                <motion.section 
        id="avis" 
        className="py-12 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      > 
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
                       <h3 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {t.testimonialsTitle}
            </h3> 
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>
              <span className="text-3xl font-bold text-gray-800 dark:text-gray-200">{t.googleRating}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Basé sur {t.totalReviews} avis Google</p>
          </motion.div>
          
                   <div className="grid sm:grid-cols-2 gap-4 sm:gap-8"> 
            {t.testimonials.map((review, i) => (
              <motion.div 
                key={i} 
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              > 
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 italic">"{review.review}"</p>
              </motion.div> 
            ))}
          </div>
        </div>
      </motion.section>  

           <motion.section 
        id="contact" 
        className="py-12 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      > 
               <motion.h3 
          className="text-xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ y: -30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.contactTitle}
        </motion.h3> 
               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto text-center md:text-left"> 
                   <motion.div 
            className="flex flex-col items-center md:items-start gap-2 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          > 
                       <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="text-red-600 group-hover:text-red-500 transition-colors" size={28} />
            </motion.div> 
            <p>{t.address}</p>
                   </motion.div>
          <motion.div 
            className="flex flex-col items-center md:items-start gap-2 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          > 
                       <motion.div
              whileHover={{ rotate: [0, 15, -15, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Phone className="text-red-600 group-hover:text-red-500 transition-colors" size={28} />
            </motion.div> 
            <p>{t.phone}</p>
                   </motion.div>
          <motion.div 
            className="flex flex-col items-center md:items-start gap-2 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          > 
                       <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Mail className="text-red-600 group-hover:text-red-500 transition-colors" size={28} />
            </motion.div> 
            <p>{t.email}</p>
                   </motion.div>
        </div>
      </motion.section> 

           <motion.section 
        id="reservation" 
        className="py-12 sm:py-20 px-4 sm:px-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      > 
               <motion.h3 
          className="text-xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t.reservationTitle}
        </motion.h3> 
               <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        > 
                   <motion.input
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all duration-300"
            whileFocus={{ scale: 1.02 }} 
            type="text"
            placeholder={t.placeholders.nom}
            name="nom"
            value={form.nom}
            onChange={handleInput}
            required
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            type="email"
            placeholder={t.placeholders.email}
            name="email"
            value={form.email}
            onChange={handleInput}
            required
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            type="tel"
            placeholder={t.placeholders.tel}
            name="tel"
            value={form.tel}
            onChange={handleInput}
          />
          <input
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            type="date"
            name="date"
            value={form.date}
            onChange={handleInput}
            required
          />
          <textarea
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder={t.placeholders.message}
            name="message"
            value={form.message}
            onChange={handleInput}
            rows={4}
          />
                   <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            <motion.div
              animate={loading ? { rotate: 360 } : {}}
              transition={loading ? { repeat: Infinity, duration: 1 } : {}}
            >
              <CalendarCheck size={20} />
            </motion.div>
            {loading ? '...' : t.buttons.reserver}
          </motion.button> 
          {feedback && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center mt-4 font-semibold ${
                feedback.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {feedback.message}
            </motion.p>
          )}
               </motion.form>
      </motion.section> 

                 <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"> 
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
                           <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-4 italic">La Bella Forchetta</h3> 
              <p className="text-gray-300 mb-4">Authentic Italian cuisine in the heart of Paris since 2018.</p>
              <div className="flex gap-4">
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Facebook size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Twitter size={20} />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
                           <h4 className="text-base sm:text-lg font-semibold mb-4 text-red-400">Navigation</h4> 
              <div className="space-y-2">
                {t.nav.map((item, i) => (
                  <a key={i} href={`#${item.toLowerCase()}`} className="block text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
                           <h4 className="text-base sm:text-lg font-semibold mb-4 text-red-400">Contact</h4> 
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{t.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{t.email}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
                           <h4 className="text-base sm:text-lg font-semibold mb-4 text-red-400">Horaires</h4> 
              <div className="space-y-2 text-gray-300 text-sm">
                {t.hours.schedule.map((item, i) => (
                  <div key={i}>
                    <div className="font-medium">{item.day}</div>
                    <div className="text-red-400">{item.hours}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>© 2025 La Bella Forchetta. Tous droits réservés.</p>
          </motion.div>
        </div>
      </footer> 
    </div>
  );
}
 