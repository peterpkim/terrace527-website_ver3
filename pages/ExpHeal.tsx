import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Mountain, Map, Bed, ThermometerSun, Droplets, ArrowRight } from 'lucide-react';

const EXP_NAV = [
  { name: 'Heal & Comfort', path: '/experience/heal' },
  { name: 'Play & Dining', path: '/experience/play' },
  { name: 'Stay Services', path: '/experience/service' }
];

const PROGRAMS = [
  { id: 'spa', titleEn: 'Outdoor Hot Spa', titleKo: '온수 스파', concept: '사계절 내내 누리는 따스한 고요', description: '최고급 노천 스파 시스템으로 숲을 마주하며 쌓인 피로를 풀어보세요.', items: ['프라이빗 개별 테라스 스파', '최적의 온열 시스템', '프리미엄 입욕제 제공'], info: { time: '입실 후 ~ 22:00', type: '객실별 유료 옵션' }, icon: <Waves />, image: './IMAGE/Heal_Prog_01.webp' }, // 첨부 6번
  { id: 'pool', titleEn: 'Groundwater Pool', titleKo: '야외 수영장', concept: '지하 200m 암반수의 청량함', description: '천연 암반수를 사용하여 계곡의 시원함을 그대로 담은 대형 야외 수영장입니다.', items: ['지하 200m 천연 암반수', '7M 대형 아웃도어 풀', '여름 시즌 전용 운영'], info: { time: '10:00 ~ 18:00', type: '투숙객 무료 개방' }, icon: <Droplets />, image: './IMAGE/Heal_Prog_02.webp' }, // 첨부 7번
  { id: 'valley', titleEn: 'Natural Valley', titleKo: '자연 계곡 이용', concept: '숙소 바로 앞, 1급수의 시원함', description: '테라스 527 입구 바로 앞 청정 계곡. 자연의 소리를 들으며 물놀이를 즐기세요.', items: ['입구 맞은편 도보 1분', '사계절 맑은 1급수 계곡', '자연 그늘막 완비'], info: { time: '상시 이용 가능', type: '자연 무료 이용' }, icon: <Mountain />, image: './IMAGE/Heal_Prog_03.webp' }, // 첨부 9번
  { id: 'nature', titleEn: 'Lake Walk', titleKo: '호수 산책', concept: '물안개 피는 새벽의 고요한 산책', description: '도보 5분 거리의 산정호수 둘레길. 사계절의 변화를 가장 가까이서 느껴보세요.', items: ['산정호수 둘레길 인접', '포토스팟 가이드 제공', '조식 전 아침 산책 추천'], info: { time: '일출 ~ 일몰 추천', type: '자연 무료 이용' }, icon: <Map />, image: './IMAGE/Heal_Prog_04.webp' }, // 첨부 8번
  { id: 'bedding', titleEn: 'Premium Bedding', titleKo: '고급 침구 & 어메니티', concept: '호텔의 안락함을 자연 속으로', description: '최고급 구스 침구와 친환경 어메니티로 완벽한 숙면을 제공합니다.', items: ['프리미엄 구스 이불', '고체 어메니티 세트', '매일 살균 세탁 시스템'], info: { time: '입실 시 비치', type: '전 객실 기본 제공' }, icon: <Bed />, image: './IMAGE/Heal_Prog_05.webp' }, // 첨부 3번
  { id: 'heating', titleEn: 'Winter Heating', titleKo: '겨울철 난방 완비', concept: '한겨울에도 훈훈한 글램핑', description: '바닥 난방과 온풍기, 등유 난로까지 3중 난방 시스템으로 겨울 캠핑 걱정 없습니다.', items: ['전 객실 바닥 난방', '에어컨/온풍기 겸용', '등유 난로 대여 가능'], info: { time: '사계절 상시', type: '전 객실 기본 완비' }, icon: <ThermometerSun />, image: './IMAGE/Heal_Prog_06.webp' }, // 첨부 4번
];

const ProgramBlock: React.FC<any> = ({ titleKo, concept, description, items, info, icon, image }) => (
  <div className="py-20 md:py-32 border-b border-stone-100 last:border-none group/block">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[16/10] bg-stone-100">
        <img src={image} alt="" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/block:scale-110" />
        <div className="absolute top-6 left-6 bg-emerald-900 text-white p-4 rounded-3xl shadow-xl">{React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}</div>
      </div>
      <div className="lg:col-span-5 space-y-8">
        <h3 className="text-3xl font-bold text-emerald-950 serif leading-tight">{concept}</h3>
        <p className="text-gray-500 leading-relaxed font-light">{description}</p>
        <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100">
          <ul className="space-y-4">{items.map((item: string, idx: number) => (<li key={idx} className="flex items-center gap-3 text-sm font-semibold text-stone-700"><div className="w-1 h-1 bg-emerald-900 rounded-full" /> {item}</li>))}</ul>
          <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between text-[11px] font-bold text-stone-400"><span>{info.time}</span><span className="text-emerald-900">{info.type}</span></div>
        </div>
      </div>
    </div>
  </div>
);

const ExpHeal: React.FC = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-white">
      <section className="relative h-[50vh] flex items-center justify-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0"><img src="./IMAGE/Exp_Hero_H.webp" alt="" className="w-full h-full object-cover opacity-30" /></div>
        <div className="relative z-10 text-center px-4"><h1 className="text-white text-5xl font-bold serif tracking-tighter mb-4">힐링 & 컴포트</h1><p className="text-white/60 text-lg font-light tracking-widest italic">"아무 준비 없이 와도 충분히 편안한 휴식"</p></div>
      </section>
      <nav className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-stone-100"><div className="max-w-7xl mx-auto px-6 flex justify-center gap-12 h-16 items-center">{EXP_NAV.map((nav) => (<Link key={nav.path} to={nav.path} className={`text-[11px] font-bold tracking-widest uppercase border-b-2 py-5 ${location.pathname === nav.path ? 'border-emerald-900 text-emerald-950' : 'border-transparent text-gray-400'}`}>{nav.name}</Link>))}</div></nav>
      <div className="max-w-7xl mx-auto px-6">{PROGRAMS.map(prog => <ProgramBlock key={prog.id} {...prog} />)}</div>
    </div>
  );
};
export default ExpHeal;