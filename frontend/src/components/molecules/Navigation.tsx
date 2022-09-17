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
          <a className="block" href="/user">
            &gt; 登録情報
          </a>
        </li>
        <li className="mb-2">
          <a className="block" href="/user/templates">
            &gt; 新規作成
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
