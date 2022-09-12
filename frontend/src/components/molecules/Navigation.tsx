import { FC } from "react";
import "../../index.css";

type Props = {
  open: boolean;
  id: string;
};

const Navigation: FC<Props> = ({ open, id }) => {
  return (
    <nav id={id} aria-hidden={!open} className="navigation">
      <ul>
        <li className="mb-2">
          <a className="block" href="#">
            &gt; 新規登録
          </a>
        </li>
        <li className="mb-2">
          <a className="block" href="#">
            &gt; 登録アドレスリスト
          </a>
        </li>
        <li>
          <a className="block" href="/">
            &gt; ログアウト
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
