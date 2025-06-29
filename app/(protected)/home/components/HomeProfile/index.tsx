interface HomeProfileProps {
  name: string;
  role: string;
  code: string;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ name, role, code }: HomeProfileProps) => {
  return (
    <div className="flex gap-4 items-start w-full">
      <div className="flex flex-col flex-1 gap-2 sm:gap-2.5 items-start">
        <div className="flex gap-2 items-center flex-wrap">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl lg:leading-10">
            {name}님,
          </h1>
          <span className="text-2xl font-bold text-zinc-900 sm:text-3xl lg:text-4xl lg:leading-10">
            안녕하세요
          </span>
        </div>
        <p className="text-base leading-6 text-slate-500 sm:text-lg">
          {role === 'Doctor' ? '의사' : '간호사'} 코드 - {code}
        </p>
      </div>
    </div>
  );
};

export default HomeProfile;
