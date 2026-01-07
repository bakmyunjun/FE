import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-8">
      <h1 className="text-h2 font-bold">페이지를 찾을 수 없습니다</h1>
    </div>
  );
}
