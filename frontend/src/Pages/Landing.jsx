import React from 'react'

import HeroSection from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testinomials'
import Locations from '../components/Locations'
import Footer from '../components/Footer'
function Landing() {
  return (
    <>
    <HeroSection />
    <Services />
    <Testimonials />
    <Locations />
    <Footer />

    </>
  )
}

export default Landing