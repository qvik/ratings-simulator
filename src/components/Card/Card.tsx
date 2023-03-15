type CardProps = {
  children: JSX.Element;
  title: string;
};

export default function Card({ children, title }: CardProps) {
  return (
    <div className={'shadow-md bg-white p-4 mb-6 rounded'}>
      <h4 className="text-center mb-3 text-gray-400">{title}</h4>
      {children}
    </div>
  );
}
