import React, { useState, useRef, useEffect } from 'react'

const useDraggable = () => {
  const [isMove, setIsMove] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0])//鼠标的坐标
  const [divPosition, setDivPosition] = useState<[number, number]>([0, 0])//div的坐标
  const Ref = useRef<any>(null)

  const MouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMove(true)
    Ref.current.style.cursor = 'move'
    setMousePosition([e.clientX, e.clientY])
  }

  const MouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isMove) return
    const [mouseX, mouseY] = [e.clientX, e.clientY]
    Ref.current.style.left = `${divPosition[0] + mouseX - mousePosition[0]}px`
    Ref.current.style.top = `${divPosition[1] + mouseY - mousePosition[1]}px`

  }

  const MouseUp = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMove(false)
    Ref.current.style.cursor = 'default'
    setDivPosition([Ref.current.offsetLeft, Ref.current.offsetTop])
  }

  useEffect(() => {
    setDivPosition([Ref.current.offsetLeft, Ref.current.offsetTop])
  }, [])


  return {
    Ref, MouseDown, MouseMove, MouseUp
  }

}
export default useDraggable