import {TabNames} from '../../const';
import {Link} from 'react-router-dom';
import {Film} from '../../types/films';
import {Review} from '../../types/reviews';
import {useState} from 'react';

import Details from './details';
import Overview from './overview';
import Reviews from './reviews';

type TabsProps = {
  film: Film,
  comments: Review[]
}

function Tabs({film, comments}: TabsProps): JSX.Element {

  const [activeTab, setActiveTab] = useState<string>(TabNames.Overview);

  const handleClick = (name: string) => {
    setActiveTab(name);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.keys(TabNames).map((tab) => (
            <li key={tab} className={`film-nav__item ${activeTab === tab ? 'film-nav__item--active' : ''}`} onClick={() => handleClick(tab)}>
              <Link to={'#'} className="film-nav__link">{tab}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === TabNames.Details && <Details film={film}/>}
      {activeTab === TabNames.Overview && <Overview film={film}/>}
      {activeTab === TabNames.Reviews && <Reviews comments={comments}/>}
    </>
  );
}
export default Tabs;
