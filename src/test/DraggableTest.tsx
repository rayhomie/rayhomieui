import React, { useState, useRef, useEffect } from 'react'


const DraggableTest: React.FC<any> = () => {
  const [isMove, setIsMove] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0])//鼠标的坐标
  const [divPosition, setDivPosition] = useState<[number, number]>([0, 0])//div的坐标
  const divRef = useRef<any>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMove(true)
    divRef.current.style.cursor = 'move'
    setMousePosition([e.clientX, e.clientY])
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isMove) return
    const [mouseX, mouseY] = [e.clientX, e.clientY]
    divRef.current.style.left = `${divPosition[0] + mouseX - mousePosition[0]}px`
    divRef.current.style.top = `${divPosition[1] + mouseY - mousePosition[1]}px`

  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMove(false)
    divRef.current.style.cursor = 'default'
    setDivPosition([divRef.current.offsetLeft, divRef.current.offsetTop])
  }

  useEffect(() => {
    setDivPosition([divRef.current.offsetLeft, divRef.current.offsetTop])
  }, [])


  return (
    <div
      ref={divRef}
      style={{ position: 'absolute', zIndex: 99 }}
      onMouseDown={(e) => {
        handleMouseDown(e)
      }}
      onMouseUp={(e) => {
        handleMouseUp(e)
      }}
      onMouseMove={(e) => {
        handleMouseMove(e)
      }}
    >
      <img
        style={{ width: '200px', backgroundColor: 'black' }}
        src={process.env.PUBLIC_URL + '/logo512.png'}
        alt='1'
      />
    </div>
  )
}
export default DraggableTest