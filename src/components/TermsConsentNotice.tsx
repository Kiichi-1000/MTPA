import { Link } from 'react-router-dom';

type Props = {
  className?: string;
  linkClassName?: string;
};

export default function TermsConsentNotice({
  className = 'mt-3 text-xs md:text-sm text-slate-200/90',
  linkClassName = 'underline underline-offset-4 hover:text-white',
}: Props) {
  return (
    <p className={className}>
      ※「診断を始める」を押すことで、
      <Link to="/terms" className={linkClassName}>
        利用規約
      </Link>
      に同意いただいたものとして取り扱います。
    </p>
  );
}


