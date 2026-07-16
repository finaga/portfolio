import { useRef } from 'react'
import { TLink } from '../lib/AppContext'
import Plate from './Plate'

export default function IndexRow({ project, onHover }) {
  const thumbRef = useRef(null)
  const media = project.image ? (
    <img src={project.image} alt={project.imageAlt || ''} loading="lazy" width="800" height="533" />
  ) : (
    <Plate kind={project.plateHero} />
  )

  return (
    <TLink
      to={`/work/${project.slug}`}
      className="index-row"
      morph={() => ({
        el: thumbRef.current,
        src: project.image,
        plate: !project.image ? <Plate kind={project.plateHero} /> : null,
        slug: project.slug,
      })}
      onMouseEnter={() => onHover?.(project)}
      onMouseLeave={() => onHover?.(null)}
    >
      <span className="index-num">{project.num}</span>
      <span className="index-thumb" ref={thumbRef} aria-hidden="true">
        {media}
      </span>
      <span className="index-title">{project.short}</span>
      <span className="index-meta">
        <span className="client">{project.client}</span>
        <span className="sep" aria-hidden="true">·</span>
        <span className="disc">{project.discipline}</span>
        <span className="sep" aria-hidden="true">·</span>
        <span className="year">{project.year}</span>
      </span>
    </TLink>
  )
}
