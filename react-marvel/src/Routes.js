import Characters from './pages/Characters/Characters';
import Creators from './pages/Creators/Creators';
import Series from './pages/Series/Series';

const Pages = [
    {
        path: "/",
        exact: true,
        main: Characters
    },
    {
        path: "/creators",
        exact: true,
        main: Creators
    },
    {
        path: "/series",
        exact: true,
        main: Series
    }
]

export default Pages;