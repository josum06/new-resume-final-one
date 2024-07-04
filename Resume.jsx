import React, { forwardRef, useEffect, useRef } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";

import styles from "./Resume.module.css";

const Resume = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    positionOfResponsibility: information[sections.positionOfResponsibility],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        className={`${styles.section} ${info.workExp?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              <div className={styles.itemHeader}>
                {item.title && <p className={styles.title}>{item.title}</p>}
                {item.companyName && <p className={styles.subTitle}>{item.companyName}</p>}
              </div>
              <div className={styles.itemMeta}>
                {item.startDate && item.endDate && (
                  <div className={styles.date}>
                    <Calendar /> {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
                  </div>
                )}
                {item.location && (
                  <p className={styles.date}>
                    <MapPin /> {item.location}
                  </p>
                )}
              </div>
              {item.points?.length > 0 && (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        className={`${styles.section} ${info.project?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              <div className={styles.itemHeader}>
                {item.title && <p className={styles.title}>{item.title}</p>}
              </div>
              <div className={styles.itemMeta}>
                {item.link && (
                  <a className={styles.link} href={item.link}>
                    <Paperclip />
                    {item.link}
                  </a>
                )}
                {item.github && (
                  <a className={styles.link} href={item.github}>
                    <GitHub />
                    {item.github}
                  </a>
                )}
              </div>
              {item.overview && <p className={styles.overview}>{item.overview}</p>}
              {item.points?.length > 0 && (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        className={`${styles.section} ${info.education?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className={styles.sectionTitle}>{info.education.sectionTitle}</div>
        <div className={styles.content}>
          <table className={styles.educationTable}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Degree / Board</th>
                <th>Institute</th>
                <th>GPA / Marks(%)</th>
              </tr>
            </thead>
            <tbody>
              {info.education?.details?.map((item, index) => (
                <tr key={index}>
                  <td>{item.startYear} - {item.endYear}</td>
                  <td>{item.title}</td>
                  <td>{item.college}</td>
                  <td>{item.GPA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        className='{${styles.section} ${info.achievement?.sectionTitle ? "" : styles.hidden}}'
      >
        <div className={styles.sectionTitle}>{info.achievement.sectionTitle}</div>
        <div className={styles.content}>
          {info.achievement?.details?.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.overview}</p>
              <ul className={styles.points}>
                {item.points?.map((point, index) => (
                  <li key={point + index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.positionOfResponsibility]: (
      <div
        key={"positionOfResponsibility"}
        className={`${styles.section} ${info.positionOfResponsibility?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className={styles.sectionTitle}>{info.positionOfResponsibility.sectionTitle}</div>
        <div className={styles.content}>
          {info.positionOfResponsibility?.details?.map((item, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.itemHeader}>
                <p className={styles.title}>{item.title}</p>
              </div>
              {item.points?.length > 0 && (
                <ul className={styles.points}>
                  {item.points.map((elem, index) => (
                    <li className={styles.point} key={index}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        className={`${styles.section} ${info.other?.sectionTitle ? "" : styles.hidden}`}
      >
        <div className={styles.sectionTitle}>{info.other.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info?.other?.detail}</p>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;
    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
          <p className={styles.heading}>{info.basicInfo?.detail?.name}</p>
          <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>
          <div className={styles.links}>
            {info.basicInfo?.detail?.email && (
              <a className={styles.link} type="email">
                <AtSign /> {info.basicInfo?.detail?.email}
              </a>
            )}
            {info.basicInfo?.detail?.phone && (
              <a className={styles.link}>
                <Phone /> {info.basicInfo?.detail?.phone}
              </a>
            )}
            {info.basicInfo?.detail?.linkedin && (
              <a className={styles.link}>
                <Linkedin /> {info.basicInfo?.detail?.linkedin}
              </a>
            )}
            {info.basicInfo?.detail?.github && (
              <a className={styles.link}>
                <GitHub /> {info.basicInfo?.detail?.github}
              </a>
            )}
          </div>
        </div>
        <div className={styles.main}>
          {Object.values(sections).map((section) => sectionDiv[section])}
        </div>
      </div>
    </div>
  );
});

export default Resume;
