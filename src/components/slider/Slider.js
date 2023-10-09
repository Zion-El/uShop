import React, {useState, useEffect} from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { sliderData} from "./slider-data"
import "./Slider.scss"

const Slider = () => {
    const  [currentSlide, setCurrentSlide] = useState(0)
    const  slideLength = sliderData.length
    const autoScroll = true
    let slideInterval;
    let IntervalTime = 5000

    const nextSlide = ()=>{
        setCurrentSlide(currentSlide===slideLength -1 ? 0 : currentSlide + 1)
    }
    const prevSlide = ()=>{
        setCurrentSlide(currentSlide=== 0 ? slideLength -1 : currentSlide - 1)
    }


    useEffect(() => {
        if (autoScroll){
            slideInterval = setInterval(nextSlide, IntervalTime);
        }
      return () => clearInterval(slideInterval)
    }, [currentSlide, slideInterval, autoScroll]);
    
  return (
    <div className="slider">
     <AiOutlineArrowLeft  onClick={prevSlide} className="arrow prev"/>
     <AiOutlineArrowRight onClick={nextSlide} className="arrow next"/>
    
    {
        sliderData.map((slide, index)=>{
            const {image, heading, desc} = slide
            return(
                <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                    {
                        index === currentSlide && (
                            <>
                                <img src={image} alt="background"/>
                                <div className="content">
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr/>
                                    <a  href="#home" className="--btn --btn-primary">Shop Now</a>
                                </div>
                            </>
                        )
                    }
                </div>
            )
        })
    }
    </div>
  )
}

export default Slider
