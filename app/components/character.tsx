'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useInterval } from 'react-use'
import { CharacterType } from './types'
import Image from 'next/image'

// show ずんだもん
const Character = ({ character }: { character: CharacterType }) => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const imageRef = useRef<HTMLImageElement>(null)

  const images = ['/zundamon1.png', '/zundamon2.png', '/zundamon3.png']

  const changeImage = () => {
    setImageIndex((imageIndex + 1) % images.length)
  }

  // every 2 sec
  useInterval(changeImage, 2000)

  // GSAP animation
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        duration: 0.5,
        scale: 1,
        repeat: 1,
        yoyo: true,
        ease: 'power1.inOut', 
      })
    }
  }, [imageIndex])

  return (
    <div>
      {/* ずんだもん */}
      {character.value === '3' && (
        <div className="fixed bottom-5 right-5">
          <Image
            ref={imageRef}
            src={images[imageIndex]}
            className="object-cover drop-shadow-lg"
            alt="zundamon"
            width={300}
            height={458}
          />
        </div>
      )}
    </div>
  )
}

export default Character
