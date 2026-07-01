import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Stats from '../../components/Stats/Stats'
import Features from '../../components/Features/Features'
import HowItWorks from '../../components/HowItWorks/HowItWork'
import WhyChoose from '../../components/WhyWechoose/Whychoose'
import Testimonials from '../../components/Testimonials/Testimonial'
import CTA from '../../components/CTA/Cta'
import Footer from '../../components/Footer/Footer'

const Landing = () => {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <Stats/>
      <Features/>
      <HowItWorks/>
      <WhyChoose/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Landing
