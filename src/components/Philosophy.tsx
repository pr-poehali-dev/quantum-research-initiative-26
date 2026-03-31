import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Безопасность прежде всего",
    description:
      "Безопасность пассажиров — наш главный приоритет. Современные системы контроля, многоуровневая проверка и квалифицированный персонал обеспечивают надёжность на каждом этапе.",
  },
  {
    title: "Комфорт в каждой детали",
    description:
      "Просторные залы ожидания, удобная навигация и разнообразие сервисов — мы создаём пространство, где время в ожидании рейса проходит приятно.",
  },
  {
    title: "Ворота Дальнего Востока",
    description:
      "Хабаровский аэропорт — главный авиационный узел региона, связывающий восток России с городами страны и мира. Мы с гордостью встречаем и провожаем миллионы пассажиров.",
  },
  {
    title: "Современная инфраструктура",
    description: "Постоянное развитие и модернизация объектов: новые стойки регистрации, системы досмотра и цифровые сервисы для быстрого и удобного прохождения всех процедур.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О нас</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Аэропорт
              <br />
              <HighlightedText>Хабаровск</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Терминал аэропорта Хабаровск"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Международный аэропорт Хабаровск (Новый) — крупнейший авиационный узел Дальнего Востока. Мы обеспечиваем бесперебойное авиасообщение с более чем 30 направлениями внутри страны и за рубежом.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
