"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, Instagram, Mail, MapPin, Cpu, Watch, History, CheckCircle2, Clock } from 'lucide-react';

export default function Home() {
  const [cart, setCart] = useState<{id: number, name: string, price: number, img: string, strap: string}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedStrap, setSelectedStrap] = useState("Acier brossé");
  const [genevaTime, setGenevaTime] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");

  // 1. Horloge de Genève en temps réel
  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(new Date());
      setGenevaTime(time);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const products = [
    { id: 1, name: "Série Élégance", price: 599, img: "/montre1.jpg", desc: "Une pièce intemporelle alliant la finesse de l'horlogerie classique et la robustesse moderne.", specs: { diametre: "39mm", reserve: "42h", mouvement: "Auto Aura-V1" } },
    { id: 2, name: "Onyx Black", price: 899, img: "/montre.jpg", desc: "Le noir absolu. Une montre de plongée furtive avec un cadran en onyx véritable.", specs: { diametre: "41mm", reserve: "70h", mouvement: "Auto Aura-Deep" } },
    { id: 3, name: "Hydro Dive-2", price: 459, img: "/montre3.jpg", desc: "Conçue pour l'exploration. Étanche jusqu'à 300m, lunette en céramique inrayable.", specs: { diametre: "42mm", reserve: "48h", mouvement: "Meca-Quartz Pro" } },
    { id: 4, name: "Metro Modern", price: 720, img: "/montre4.jpg", desc: "L'architecture au poignet. Design minimaliste inspiré du Bauhaus avec boîtier ultra-plat.", specs: { diametre: "38mm", reserve: "40h", mouvement: "Slim Aura-S" } },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, strap: selectedStrap }]);
    setSelectedProduct(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    const randomSerial = "AUR-" + Math.random().toString(36).toUpperCase().substring(2, 10);
    setSerialNumber(randomSerial);
    setOrderComplete(true);
    setCart([]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-[#0A0F1A] text-[#F3E5AB] font-sans selection:bg-[#F3E5AB] selection:text-[#0A0F1A] overflow-x-hidden">
      
      {/* --- NOTIFICATION TOAST --- */}
      <div className={`fixed top-24 right-6 z-[200] transition-all duration-500 transform ${showToast ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0 pointer-events-none"}`}>
        <div className="bg-[#F3E5AB] text-[#0A0F1A] px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold text-[10px] tracking-widest uppercase">
          <CheckCircle2 size={16} /> Pièce ajoutée à l'écrin
        </div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0F1A]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-serif tracking-[0.4em] uppercase italic text-[#F3E5AB] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Aura</div>
            <div className="hidden lg:flex items-center gap-2 text-[9px] text-[#94A3B8] border-l border-white/10 pl-8 tracking-[0.2em]">
              <Clock size={12} className="text-[#F3E5AB]" /> GENÈVE {genevaTime}
            </div>
          </div>
          <div className="hidden md:flex gap-10 text-[9px] tracking-[0.5em] font-semibold text-[#94A3B8]">
            <a href="#collections" className="hover:text-[#F3E5AB] transition-colors">COLLECTIONS</a>
            <a href="#atelier" className="hover:text-[#F3E5AB] transition-colors">L'ATELIER</a>
            <a href="#contact" className="hover:text-[#F3E5AB] transition-colors">CONTACT</a>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#F3E5AB] text-[#0A0F1A] text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">{cart.length}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative min-h-screen flex items-center pt-20 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F3E5AB]/5 blur-[180px] rounded-full"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <div className="text-left">
            <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tight leading-[1.1] text-white animate-fade-in">L'Équilibre <br /> <span className="text-[#F3E5AB] italic text-5xl md:text-7xl">Parfait.</span></h1>
            <p className="text-[#94A3B8] max-w-md mb-12 text-[10px] tracking-[0.3em] leading-relaxed uppercase">Manufacture Suisse. Assemblage Main. Éditions Limitées.</p>
            <button onClick={() => document.getElementById('collections')?.scrollIntoView({behavior:'smooth'})} className="bg-[#F3E5AB] text-[#0A0F1A] px-12 py-5 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase shadow-xl hover:scale-105 transition-all">Explorer</button>
          </div>
          <div className="relative flex justify-center">
            <img src="/montre.jpg" className="w-full max-w-[420px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.8)] animate-subtle-zoom" />
          </div>
        </div>
      </section>

      {/* --- COLLECTIONS --- */}
      <section id="collections" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10px] tracking-[0.6em] text-[#F3E5AB] font-bold mb-6 uppercase">La Sélection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="aspect-[4/5] mb-6 overflow-hidden bg-white/5 border border-white/10 rounded-2xl relative transition-all duration-500 group-hover:border-[#F3E5AB]/30 group-hover:-translate-y-2">
                  <img src={product.img} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="text-[9px] tracking-[0.4em] font-bold border border-white/20 px-6 py-3 rounded-full text-white">DÉCOUVRIR</span>
                  </div>
                </div>
                <h3 className="text-[11px] font-bold tracking-[0.2em] text-[#F3E5AB] uppercase mb-1">{product.name}</h3>
                <p className="text-[#94A3B8] text-[10px] tracking-widest">{product.price}€</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODALE DÉTAIL (Optimisée Mobile) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
          <div className="fixed inset-0 bg-[#0A0F1A]/98 backdrop-blur-xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-6xl bg-[#0D1424] border border-white/10 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto lg:overflow-visible">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/30 hover:text-white z-50 transition-colors"><X size={28} /></button>
            <div className="bg-[#0A0F1A] flex items-center justify-center p-12 min-h-[300px]">
               <img src={selectedProduct.img} className="w-full max-h-[400px] object-contain drop-shadow-2xl scale-110" />
            </div>
            <div className="p-8 lg:p-16 flex flex-col justify-center bg-[#0D1424]">
              <span className="text-[9px] tracking-[0.5em] text-[#F3E5AB] font-bold uppercase mb-4 opacity-60 italic">Manufacture Aura</span>
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-6 leading-tight">{selectedProduct.name}</h2>
              <p className="text-[#94A3B8] text-xs leading-loose mb-10 tracking-[0.1em] uppercase">"{selectedProduct.desc}"</p>
              
              <div className="grid grid-cols-3 gap-6 mb-12 border-y border-white/5 py-8">
                <div className="text-center">
                  <Watch size={18} className="mx-auto mb-3 text-[#F3E5AB] opacity-50" />
                  <p className="text-[10px] font-bold text-white uppercase">{selectedProduct.specs.diametre}</p>
                </div>
                <div className="text-center">
                  <History size={18} className="mx-auto mb-3 text-[#F3E5AB] opacity-50" />
                  <p className="text-[10px] font-bold text-white uppercase">{selectedProduct.specs.reserve}</p>
                </div>
                <div className="text-center">
                  <Cpu size={18} className="mx-auto mb-3 text-[#F3E5AB] opacity-50" />
                  <p className="text-[10px] font-bold text-white uppercase tracking-tighter">{selectedProduct.specs.mouvement}</p>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-[10px] tracking-[0.3em] font-bold uppercase mb-4 text-white">Personnalisation</p>
                <div className="flex flex-wrap gap-3">
                  {["Acier brossé", "Cuir Italien", "Vulcain"].map((strap) => (
                    <button key={strap} onClick={() => setSelectedStrap(strap)} className={`px-6 py-3 text-[8px] tracking-[0.2em] font-bold uppercase rounded-full border transition-all ${selectedStrap === strap ? 'bg-[#F3E5AB] text-[#0A0F1A] border-[#F3E5AB]' : 'border-white/10 text-white hover:border-white/40'}`}>{strap}</button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-4xl font-serif text-white">{selectedProduct.price}€</div>
                <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-[#F3E5AB] text-[#0A0F1A] py-6 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white transition-all shadow-2xl">Acquérir</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ATELIER --- */}
      <section id="atelier" className="py-32 px-6 bg-[#0D1424]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 group">
            <img src="/montre5.jpg" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent"></div>
          </div>
          <div>
            <h2 className="text-[10px] tracking-[0.6em] text-[#F3E5AB] font-bold mb-8 uppercase italic">L'Excellence</h2>
            <p className="text-4xl lg:text-6xl font-serif text-white mb-8 leading-tight italic">La main est notre <span className="text-[#F3E5AB]">seul outil.</span></p>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-12 max-w-lg tracking-wider uppercase opacity-80">Plus de 120 heures de travail minutieux pour chaque mouvement. Un héritage qui défie le temps.</p>
            <button className="text-[9px] tracking-[0.5em] font-bold uppercase flex items-center gap-4 hover:text-white transition-colors">Découvrir l'atelier <ArrowRight size={16}/></button>
          </div>
        </div>
      </section>

      {/* --- SIDE CART & COMMANDE --- */}
      <div className={`fixed inset-0 z-[150] ${isCartOpen ? "visible" : "invisible"}`}>
        <div className="absolute inset-0 bg-[#0A0F1A]/95 backdrop-blur-xl" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#0D1424] border-l border-white/10 p-8 flex flex-col transition-transform duration-700 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          {orderComplete ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
              <CheckCircle2 size={60} className="text-[#F3E5AB] mb-8" />
              <h2 className="text-3xl font-serif text-white mb-4 italic">Félicitations</h2>
              <p className="text-[10px] tracking-widest text-[#94A3B8] uppercase mb-12">Votre pièce est en cours de préparation.</p>
              <div className="bg-white/5 p-8 rounded-2xl border border-[#F3E5AB]/20 w-full">
                <p className="text-[8px] tracking-[0.4em] text-[#F3E5AB] uppercase mb-4">Certificat d'Authenticité</p>
                <p className="text-xl font-mono text-white tracking-tighter mb-2">{serialNumber}</p>
                <div className="h-[1px] bg-white/10 w-full mb-4"></div>
                <p className="text-[8px] text-[#94A3B8] uppercase italic">Manufacture Aura - Genève</p>
              </div>
              <button onClick={() => {setOrderComplete(false); setIsCartOpen(false)}} className="mt-12 text-[10px] tracking-[0.4em] font-bold uppercase border-b border-[#F3E5AB] pb-2 text-[#F3E5AB]">Fermer</button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xl font-serif italic text-white uppercase tracking-widest">Votre Écrin</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-[#94A3B8] hover:text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-30"><ShoppingBag size={40} className="mb-4"/><p className="text-[9px] uppercase tracking-[0.3em]">Vide</p></div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl mb-4 border border-white/5 animate-fade-in">
                      <img src={item.img} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                      <div className="flex-1">
                        <h4 className="text-[10px] font-bold tracking-widest text-white uppercase">{item.name}</h4>
                        <p className="text-[8px] text-[#94A3B8] uppercase mt-1">{item.strap}</p>
                        <p className="text-[#F3E5AB] text-[10px] mt-1">{item.price}€</p>
                      </div>
                      <button onClick={() => {const n=[...cart]; n.splice(index,1); setCart(n)}} className="text-[#94A3B8] hover:text-red-400"><Trash2 size={16} /></button>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-white/10 pt-8 mt-6">
                <div className="flex justify-between mb-8 text-[#F3E5AB]">
                  <span className="text-[9px] tracking-widest font-bold uppercase">Total</span>
                  <span className="text-2xl font-serif">{totalPrice}€</span>
                </div>
                <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-[#F3E5AB] text-[#0A0F1A] py-6 rounded-full font-bold text-[10px] tracking-[0.4em] hover:bg-white transition-all uppercase shadow-2xl disabled:opacity-20 shadow-[#F3E5AB]/10">Commander</button>
              </div>
            </>
          )}
        </div>
      </div>

      <footer id="contact" className="py-32 px-6 bg-[#070B14] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 text-center lg:text-left">
          <div className="lg:col-span-1">
            <div className="text-3xl font-serif italic tracking-[0.5em] text-[#F3E5AB] mb-6 uppercase">Aura</div>
            <p className="text-[10px] text-[#94A3B8] tracking-widest uppercase leading-loose">Depuis 1924, la manufacture Aura redéfinit les limites de l'horlogerie de luxe artisanale.</p>
          </div>
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-6">Conciergerie</h4>
             <p className="text-[10px] text-[#94A3B8] uppercase flex items-center justify-center lg:justify-start gap-4"><Mail size={14}/> conciergerie@aura.com</p>
             <p className="text-[10px] text-[#94A3B8] uppercase flex items-center justify-center lg:justify-start gap-4"><MapPin size={14}/> Rue du Rhône, Genève</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-6">Suivre l'instant</h4>
            <div className="flex justify-center lg:justify-start gap-6">
              <Instagram size={20} className="text-[#94A3B8] hover:text-[#F3E5AB] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes subtle-zoom { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-subtle-zoom { animation: subtle-zoom 20s infinite ease-in-out; }
        .animate-fade-in { animation: fade-in 1.2s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #F3E5AB; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}