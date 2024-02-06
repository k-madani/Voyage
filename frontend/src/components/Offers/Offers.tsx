import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import CopyToClipboard from "react-copy-to-clipboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Offers.css";
import axios from "axios";
import c1 from "../../assets/coupon.webp";
import c2 from "../../assets/c2.jpeg";
import c3 from "../../assets/c3.jpeg";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";
import c6 from "../../assets/c6.png";
import c7 from "../../assets/c7.webp";
import c8 from "../../assets/c8.png";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store'; 
import { useTranslation } from 'react-i18next';


interface Offer {
  id: string;
  couponCode: string;
  imageUrl: string;
}
interface userDetails {
  id: string,
  token: string,
  type: string
}

const getRandomImage = () => {
  // Function to get a random image URL
  const imageUrls = [c1, c2, c3, c4, c5, c6, c7, c8];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

const Offers: React.FC = () => {
  const { t } = useTranslation('common');
  const userState: userDetails | null = useSelector((state: RootState) => state.user);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [copied, setCopied] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const sliderRef = React.useRef<any>(null);

  useEffect(() => {
    var userId = "";
        var userToken = "";
        var type = ""
        console.log(userState);
        if(userState != null){
          userId = (userState as userDetails).id;
          userToken = (userState as userDetails).token;
          type = (userState as userDetails).type;
          console.log(userToken);
        }
    // Make an API call to fetch offers when the component mounts
    axios
      .get(`http://localhost:4000/offers?type=${type}`,{
        headers: {
          authorization: `Bearer ${userToken}`
        }
      }) // Replace with your actual API endpoint
      .then((response) => {
        // Filter offers created in the last 14 days
        const currentDate = new Date();
        const filteredOffers = response.data.filter((offer: any) => {
          const offerDate = new Date(offer.createdDate);
          const daysDifference = Math.floor(
            (currentDate.getTime() - offerDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          return daysDifference <= 14;
        });

        // Map API response to the Offer interface
        const mappedOffers: Offer[] = filteredOffers.map((offer: any) => ({
          id: offer._id,
          couponCode: offer.offerName,
          imageUrl: getRandomImage(),
        }));

        setOffers(mappedOffers);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show two offers at a time
    slidesToScroll: 1,
  };

  const handleCopy = (id: string) => {
    setCopied(true);
    setSelectedOffer(id);
    // Additional logic after copying to the clipboard
  };

  return (
    <div className="offers-container">
      <h3>Offers</h3>
      <Slider {...settings} ref={sliderRef}>
        {offers.map((offer) => (
          <div key={offer.id} className="offer-slide">
            <img src={offer.imageUrl} alt={`Offer ${offer.id}`} />
            <CopyToClipboard
              text={offer.couponCode}
              onCopy={() => handleCopy(offer.id)}
            >
              <p className="copy">{t('coupon.code')} {offer.couponCode}</p>
            </CopyToClipboard>
            {selectedOffer === offer.id && copied && (
              <span className="copied-span">{t('coupon.copied')}</span>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Offers;
