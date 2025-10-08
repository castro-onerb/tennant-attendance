import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { useGlobalModal } from "../../components/Modal/hooks/use-global-modals";
import { ClinicoGeralModal } from "./clinico-geral/clinico-geral.modal";
import DoctorMaleHero from '../../assets/doctor-male-hero.png';
import MomSonHero from '../../assets/mom-son-hero.png';
import { Headline } from "@/components/Title";

function Home() {
  const { open } = useGlobalModal();

  const handleTriage = async () => {
    const response = await fetch('http://localhost:5117/IntegrationDrAoVivo/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        logo: 'logo'
      }),
    });
    const result = await response.json();
    console.log(result);
  }

  const handleClinicoGeral = () => {
    open(
      <ClinicoGeralModal />,
      { id: 'modal-clinico-geral', backdrop: true, singletonKey: 'clinico-geral' }
    );
  }

  return (
    <div className='flex flex-col w-dvw h-dvh'>
      <div className='flex flex-col gap-6 p-6 border-b-4 border-gray-100'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-3'>
            <div className='flex-1 flex items-center gap-3'>
              <img src='logo_symbol_main.png' className='w-auto h-full max-h-20' />
              <div className='flex flex-col'>
                <Headline.H1>Olá! Tudo bem?</Headline.H1>
                <p className='text-[28px] leading-[36px] font-extrabold text-gray-600'>Seja bem-vindo(a) ao DeoVita Pro</p>
              </div>
            </div>

            <div className='flex'>
              <button className='border-4 border-gray-100 rounded-full flex items-center justify-center w-[84px] h-[84px]'>
                <Icon name='gear_line' size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-6 p-6'>
        <h2 className='font-bold text-gray-600 text-[40px] leading-[48px]'>Pronto Atendimento 24H</h2>
        <div className='flex-1 flex gap-6'>

          <div className='flex-1 flex flex-col gap-6 p-6 rounded-3xl bg-gray-50 border-2 border-gray-100'>
            <div className='flex flex-col items-center gap-3'>
              <Icon name='sthetoscope_line' size={32} className='text-primary-500' />
              <Headline.H1>Atendimento com Clínico Geral</Headline.H1>
              <p className='text-[28px] leading-[36px] font-bold text-gray-500 text-center'>Clique no botão abaixo para realizar seu atendimento</p>
            </div>
            <div className='relative flex-1 rounded-3xl flex items-end justify-center bg-primary-500'>
              <img src={DoctorMaleHero} className='max-w-full max-h-full h-[90%]' />
              <Button
                onClick={handleClinicoGeral}
                className='absolute bottom-4 bg-white hover:bg-gray-50 text-primary-500 hover:text-primary-600 transition'>
                Seja atendido agora
              </Button>
            </div>
          </div>

          <div className='flex-1 flex flex-col gap-6 p-6 rounded-3xl bg-gray-50 border-2 border-gray-100'>
            <div className='flex flex-col items-center gap-3'>
              <Icon name='sthetoscope_line' size={32} className='text-primary-500' />
              <Headline.H1>Atendimento com Pediátrico</Headline.H1>
              <p className='text-[28px] leading-[36px] font-bold text-gray-500 text-center'>Clique no botão abaixo para atender seu pequeno</p>
            </div>
            <div className='relative flex-1 rounded-3xl flex items-end justify-center bg-primary-500'>
              <Button className='absolute top-4 bg-white hover:bg-gray-50 text-primary-500 hover:text-primary-600 transition'>Pediatria apenas para recém-nascidos até criança de 14 anos</Button>
              <img src={MomSonHero} className='max-w-full max-h-full h-[90%]' />
              <Button onClick={handleTriage} className='absolute bottom-4 bg-white hover:bg-gray-50 text-primary-500 hover:text-primary-600 transition'>Seja atendido agora</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home;
