import React from 'react'
import './main.css'
import game from '../../assets/img/game.webp'
import game1 from '../../assets/img/game1.webp'
import game2 from '../../assets/img/game2.webp'

const Main = () => {
  return (
    <main className="main">
        <section className="section-about">
            <div className="u-margin-bottom-big u-margin-top-medium">
                <h2 className="heading-secondary">
                    Exciting Offers waiting for You
                </h2>
            </div>
            <div className="preview">
                <div className="preview-left">
                    <h3 className="heading-tertiary u-margin-bottom-small">
                    Join our Exclusive PRO membership to get access to the premium deals
                    </h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sitt amet consectetur, adipis amet consectetur,
                        adipisicing elit. Veniam ad adipisci ratione!
                    </p>
                    <h3 className="heading-tertiary u-margin-bottom-small">
                    You're going to fell in love with our services
                    </h3>
                    <p className="paragraph">
                        Lorem ipsum dolor sit amet ct amet consectetur, adipist amet
                        consectetur, adipisonsectetur, adipisicing elit. Veniam ad
                        adipisci ratione!
                    </p>

                    <a href="LOL" className="btn-text">Learn More &rarr;</a>
                </div>
                <div className="preview-right">
                    <div className="composition">

                        {/* <img srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w" alt="1"
                        sizes="(max-width: 900px) 20vw, (max-width: 600px) 30vw, 300px"
                        src="img/nat-1-large.jpg"
                        /> */}

                        <img src={game} alt="Listing" className="composition__photo composition__photo--p1" />

                        <img src={game1} alt="2" className="composition__photo composition__photo--p2" />
                        <img src={game2} alt="3" className="composition__photo composition__photo--p3" /> 
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default Main