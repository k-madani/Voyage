import "./Progressbar.css";

import FlagCircleSharpIcon from '@mui/icons-material/FlagCircleSharp';
import LuggageSharpIcon from '@mui/icons-material/LuggageSharp';

interface params {
    value : number;
}

const Progressbar = () => {
    return(
        <div className="placement">
        <FlagCircleSharpIcon className="vovager" sx={{fontSize:'80px'}} />
        <span className="voyage-text">Voyager</span>
        <div className="line"></div>
        <LuggageSharpIcon className="advanturer" sx={{fontSize:'50px'}}  />
        <span className="advanture-text">Adventurer</span>
      </div>
    );
}

export default Progressbar;
