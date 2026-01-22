import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, MapPin, Car, Trees, ArrowRight, ChevronLeft, ChevronRight,
  Sparkles, ExternalLink, Zap, Coffee, Bed, Droplets
} from 'lucide-react';

const HERO_IMAGES = [
  './IMAGE/Hero_01.webp', // 첨부 2번 (야간 불멍)
  './IMAGE/Hero_02.webp', // 첨부 5번 (가을 산 전경)
  './IMAGE/Hero_03.webp', 
  './IMAGE/Hero_04.webp', 
  './IMAGE/Hero_05.webp'
];

const EXPERIENCE_ITEMS = [
  {
    badge: "Exclusive Package",
    titleKo: "개별 온수 스파",
    description: "프라이빗한 노천 스파에서 즐기는 따뜻한 휴식. 계절의 온도를 피부로 느끼며 쌓인 피로를 씻어냅니다.",
    image: "./IMAGE/Home_Exp_01.webp", // 첨부 6번
    link: "/experience/heal"
  },
  {
    badge: "Water Play",
    titleKo: "천연 암반수 풀",
    description: "지하 250m 천연 암반수를 사용한 대형 수영장. 화학 약품 없는 깨끗한 물에서 안심하고 즐기세요.",
    image: "./IMAGE/Home_Exp_02.webp", // 첨부 7번
    link: "/experience/heal"
  },
  {
    badge: "Nature Walk",
    titleKo: "산정호수 산책",
    description: "도보 5분 거리의 산정호수 둘레길. 물안개 피는 새벽의 고요함과 사계절의 변화를 가장 가까이서 마주하세요.",
    image: "./IMAGE/Home_Exp_03.webp", // 첨부 8번
    link: "/experience/heal"
  },
  {
    badge: "Summer Vibe",
    titleKo: "자연 계곡 이용",
    description: "숙소 바로 앞 청정 1급수 계곡. 시원한 물소리를 배경으로 발끝에 닿는 자연의 온도를 느껴보세요.",
    image: "./IMAGE/Home_Exp_04.webp", // 첨부 9번
    link: "/experience/heal"
  },
  {
    badge: "Convenience",
    titleKo: "스마트 오더",
    description: "객실 내 태블릿과 QR 코드를 통한 비대면 주문 시스템. 바베큐 세트부터 소모품까지 문 앞까지 배달됩니다.",
    image: "./IMAGE/Home_Exp_05.webp", // 첨부 10번
    link: "/experience/service"
  }
];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapStatus, setMapStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  useEffect(() => {
    const initMap = () => {
      if (isMapInitialized.current || !mapElement.current) return;
      try {
        const naver = (window as any).naver;
        if (naver && naver.maps) {
          const terraceCoords = new naver.maps.LatLng(38.0571123, 127.3217751);
          const mapOptions = {
            center: terraceCoords, zoom: 16, zoomControl: true,
            zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
            scrollWheel: false
          };
          const map = new naver.maps.Map(mapElement.current, mapOptions);
          const marker = new naver.maps.Marker({ position: terraceCoords, map: map, title: '테라스 527' });
          const infoWindow = new naver.maps.InfoWindow({
            content: `
              <div style="padding:15px; min-width:180px; background:#fff; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <h4 style="margin:0 0 5px 0; font-family:'Pretendard',sans-serif; font-weight:700; color:#064e3b; font-size:14px;">테라스 527</h4>
                <p style="margin:0; font-size:11px; color:#666; line-height:1.4;">경기도 포천시 산정호수로 529</p>
              </div>
            `,
            backgroundColor: "transparent", borderWidth: 0, disableAnchor: false
          });
          naver.maps.Event.addListener(marker, "click", () => infoWindow.open(map, marker));
          infoWindow.open(map, marker);
          isMapInitialized.current = true;
          setMapStatus('success');
        } else {
          setMapStatus('error');
        }
      } catch (e) {
        setMapStatus('error');
      }
    };
    const safetyTimeout = setTimeout(() => { if (mapStatus === 'loading') setMapStatus('error'); }, 3500);
    const checkInterval = setInterval(() => {
      if ((window as any).naver && (window as any).naver.maps) { initMap(); clearInterval(checkInterval); }
    }, 200);
    return () => { clearInterval(checkInterval); clearTimeout(safetyTimeout); };
  }, [mapStatus]);

  const openNaverMap = () => window.open("https://naver.me/GtU3YEII", "_blank", "noopener,noreferrer");

  const scrollExperience = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; 
      const scrollAmount = direction === 'left' ? -(cardWidth + 32) : (cardWidth + 32);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-stone-50 text-stone-800 antialiased selection:bg-emerald-900 selection:text-white">
      <header className="relative w-full h-screen overflow-hidden group">
        <div className="absolute inset-0 w-full h-full">
          {HERO_IMAGES.map((img, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-110 group-hover:scale-100" />
            </div>
          ))}
          <div className="absolute inset-0 bg-stone-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-900/60"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="inline-block py-1 px-3 mb-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] tracking-[0.4em] font-bold uppercase">Premium Glamping & Stay</span>
          <h1 className="text-white serif tracking-tight leading-tight mb-12 flex flex-col items-center">
            <span className="text-lg md:text-2xl lg:text-3xl font-light mb-4 opacity-90 tracking-[0.2em]">자연이 일상이 되는 곳</span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-normal italic tracking-tighter">산정호수, 테라스 527</span>
          </h1>
          <Link to="/booking" className="inline-flex items-center gap-12 bg-white text-stone-900 px-12 py-5 rounded-full font-bold text-[11px] tracking-[0.4em] hover:bg-emerald-900 hover:text-white transition-all shadow-2xl uppercase group">RESERVE NOW <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></Link>
        </div>
      </header>

      <section id="philosophy" className="py-24 md:py-32 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/5] md:aspect-auto md:h-[650px]">
              <img src="./IMAGE/Home_Story.webp" alt="Sanjeong Lake" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-[0.4em] text-emerald-900 uppercase">Brand Story</span>
                <h2 className="text-3xl md:text-5xl font-normal serif text-stone-900 tracking-tight leading-snug break-keep">산정호수를 닮은 <br /> 숲과 물의 조화</h2>
                <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg break-keep italic">"지하수 풀과 천연 계곡, 소나무 숲의 피톤치드가 자연의 리듬을 채웁니다. 전객실 냉난방과 프리미엄 침구로, 자연 속에서도 편안하게 쉬어가세요."</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-stone-200">
                <div className="flex gap-3"><div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900"><Droplets size={20} /></div><div><h4 className="text-sm font-bold">지하 200m 암반수</h4><p className="text-[11px] text-stone-400">깨끗한 미네랄 지하수</p></div></div>
                <div className="flex gap-3"><div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900"><Zap size={20} /></div><div><h4 className="text-sm font-bold">사계절 냉난방</h4><p className="text-[11px] text-stone-400">쾌적한 온도 유지</p></div></div>
                <div className="flex gap-3"><div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900"><Bed size={20} /></div><div><h4 className="text-sm font-bold">프리미엄 침구</h4><p className="text-[11px] text-stone-400">호텔식 살균 침구</p></div></div>
                <div className="flex gap-3"><div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-900"><Coffee size={20} /></div><div><h4 className="text-sm font-bold">스마트 오더</h4><p className="text-[11px] text-stone-400">편리한 비대면 서비스</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 bg-[#121416] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-center relative">
          <div className="text-center md:text-left flex-grow">
            <span className="text-[10px] font-bold tracking-[0.5em] text-stone-500 uppercase mb-4 block">EXPERIENCE</span>
            <h2 className="text-4xl md:text-6xl font-normal serif text-[#f5f2e8] tracking-tight">감각의 회복</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scrollExperience('left')} className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"><ChevronLeft size={20} /></button>
            <button onClick={() => scrollExperience('right')} className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="w-full overflow-x-auto scrollbar-hide scroll-smooth pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          <div className="flex gap-8 pb-4 min-w-max pr-6 md:pr-12">
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <Link key={idx} to={item.link} className="group w-[320px] flex flex-col">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                  <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 left-6"><span className="bg-[#f5f2e8]/90 text-[9px] font-bold tracking-[0.2em] text-gray-900 px-4 py-1.5 rounded-full uppercase">{item.badge}</span></div>
                </div>
                <div className="px-2"><h3 className="text-xl font-bold serif text-[#f5f2e8] mb-3">{item.titleKo}</h3><p className="text-stone-500 text-xs font-light leading-relaxed break-keep">{item.description}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0"><img src="./IMAGE/Home_Footer.webp" alt="" className="w-full h-full object-cover grayscale opacity-20 blur-sm scale-110" /></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] py-20 px-6 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-normal serif text-white tracking-tight leading-tight uppercase italic mb-8">Where Nature Begins</h2>
            <Link to="/booking" className="inline-flex items-center gap-14 bg-white text-stone-950 px-14 py-6 rounded-full font-bold text-[12px] tracking-[0.5em] uppercase hover:bg-emerald-900 hover:text-white transition-all shadow-2xl group">RESERVE NOW <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;