import React, { useEffect, useState } from "react";
import { X } from "react-feather";

import InputControl from "./InputControl";

import styles from "./Editor.module.css";

function Editor(props) {
  const { sections, information, setInformation } = props;

  const [activeSectionKey, setActiveSectionKey] = useState(Object.keys(sections)[0]);
  const [activeInformation, setActiveInformation] = useState(information[sections[Object.keys(sections)[0]]]);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [sectionTitle, setSectionTitle] = useState(sections[Object.keys(sections)[0]]);
  const [values, setValues] = useState({});

  useEffect(() => {
    const activeInfo = information[sections[activeSectionKey]];
    setActiveInformation(activeInfo);
    setSectionTitle(sections[activeSectionKey]);
    setActiveDetailIndex(0);
    setValues({
      name: activeInfo?.detail?.name || "",
      title: activeInfo?.detail?.title || "",
      linkedin: activeInfo?.detail?.linkedin || "",
      github: activeInfo?.detail?.github || "",
      phone: activeInfo?.detail?.phone || "",
      email: activeInfo?.detail?.email || "",
      overview: activeInfo?.details ? activeInfo.details[0]?.overview || "" : "",
      link: activeInfo?.details ? activeInfo.details[0]?.link || "" : "",
      certificationLink: activeInfo?.details ? activeInfo.details[0]?.certificationLink || "" : "",
      companyName: activeInfo?.details ? activeInfo.details[0]?.companyName || "" : "",
      college: activeInfo?.details ? activeInfo.details[0]?.college || "" : "",
      location: activeInfo?.details ? activeInfo.details[0]?.location || "" : "",
      startDate: activeInfo?.details ? activeInfo.details[0]?.startDate || "" : "",
      endDate: activeInfo?.details ? activeInfo.details[0]?.endDate || "" : "",
      GPA: activeInfo?.detail?.GPA || "",
      startYear: activeInfo?.detail?.startYear || "",
      endYear: activeInfo?.detail?.endYear || "",
      points: activeInfo?.details ? activeInfo.details[0]?.points || "":"",
      position: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
      other: typeof activeInfo?.detail !== "object" ? activeInfo.detail : "",
    });
  }, [activeSectionKey, information, sections]);

  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) return;
    const activeInfo = information[sections[activeSectionKey]];
    setValues({
      ...values,
      overview: activeInfo.details[activeDetailIndex]?.overview || "",
      link: activeInfo.details[activeDetailIndex]?.link || "",
      certificationLink: activeInfo.details[activeDetailIndex]?.certificationLink || "",
      companyName: activeInfo.details[activeDetailIndex]?.companyName || "",
      location: activeInfo.details[activeDetailIndex]?.location || "",
      startDate: activeInfo.details[activeDetailIndex]?.startDate || "",
      endDate: activeInfo.details[activeDetailIndex]?.endDate || "",
      startYear: activeInfo.details[activeDetailIndex]?.startYear|| "",
      endYear: activeInfo.details[activeDetailIndex]?.endYear|| "",
      GPA: activeInfo.details[activeDetailIndex]?.GPA || "",
      points: activeInfo.details[activeDetailIndex]?.points || [],
      title: activeInfo.details[activeDetailIndex]?.title || "",
      position: activeInfo.details[activeDetailIndex]?.position || "",
      linkedin: activeInfo.details[activeDetailIndex]?.linkedin || "",
      github: activeInfo.details[activeDetailIndex]?.github || "",
      college: activeInfo.details[activeDetailIndex]?.college || "",
    });
  }, [activeDetailIndex, activeInformation, sections]);

  const handlePointUpdate = (value, index) => {
    const updatedPoints = [...values.points];
    updatedPoints[index] = value;
    setValues((prev) => ({ ...prev, points: updatedPoints }));
  };

  const generateBody = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Name"
                placeholder="Enter your full name"
                value={values.name}
                onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              />
              <InputControl
                label="Title"
                value={values.title}
                placeholder="Enter your title eg. Frontend developer"
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Linkedin Link"
                value={values.linkedin}
                placeholder="Enter your linkedin profile link"
                onChange={(event) => setValues((prev) => ({ ...prev, linkedin: event.target.value }))}
              />
              <InputControl
                label="Github Link"
                value={values.github}
                placeholder="Enter your github profile link"
                onChange={(event) => setValues((prev) => ({ ...prev, github: event.target.value }))}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Email"
                value={values.email}
                placeholder="Enter your email"
                onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              />
              <InputControl
                label="Enter phone"
                value={values.phone}
                placeholder="Enter your phone number"
                onChange={(event) => setValues((prev) => ({ ...prev, phone: event.target.value }))}
              />
            </div>
          </div>
        );
      case sections.workExp:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Title"
                placeholder="Enter title eg. Frontend developer"
                value={values.title}
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
              />
              <InputControl
                label="Company Name"
                placeholder="Enter company name eg. amazon"
                value={values.companyName}
                onChange={(event) => setValues((prev) => ({ ...prev, companyName: event.target.value }))}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Certificate Link"
                placeholder="Enter certificate link"
                value={values.certificationLink}
                onChange={(event) => setValues((prev) => ({ ...prev, certificationLink: event.target.value }))}
              />
              <InputControl
                label="Location"
                placeholder="Enter location eg. Remote"
                value={values.location}
                onChange={(event) => setValues((prev) => ({ ...prev, location: event.target.value }))}
              />
            </div>
            <div className={styles.row}>
              <InputControl
                label="Start Date"
                type="date"
                placeholder="Enter start date of work"
                value={values.startDate}
                onChange={(event) => setValues((prev) => ({ ...prev, startDate: event.target.value }))}
              />
              <InputControl
                label="End Date"
                type="date"
                placeholder="Enter end date of work"
                value={values.endDate}
                onChange={(event) => setValues((prev) => ({ ...prev, endDate: event.target.value }))}
              />
            </div>
            <div className={styles.column}>
              <label>Enter work description</label>
              <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
              />
              <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
              />
              <InputControl
                placeholder="Line 3"
                value={values.points ? values.points[2] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 2)}
              />
            </div>
          </div>
        );
      case sections.project:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Title"
                value={values.title}
                placeholder="Enter title eg. Chat app"
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <InputControl
              label="Overview"
              value={values.overview}
              placeholder="Enter basic overview of project"
              onChange={(event) => setValues((prev) => ({ ...prev, overview: event.target.value }))}
            />
            <div className={styles.row}>
              <InputControl
                label="Deployed Link"
                value={values.link}
                placeholder="Enter deployed link of project"
                onChange={(event) => setValues((prev) => ({ ...prev, link: event.target.value }))}
              />
              <InputControl
                label="Github Link"
                value={values.github}
                placeholder="Enter github link of project"
                onChange={(event) => setValues((prev) => ({ ...prev, github: event.target.value }))}
              />
            </div>
            <div className={styles.column}>
              <label>Enter project description</label>
              <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
              />
              <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
              />
              <InputControl
                placeholder="Line 3"
                value={values.points ? values.points[2] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 2)}
              />
              <InputControl
                placeholder="Line 4"
                value={values.points ? values.points[3] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 3)}
              />
            </div>
          </div>
        );
      case sections.education:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Title"
                value={values.title}
                placeholder="Enter title eg. B-tech"
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <InputControl
              label="College/School Name"
              value={values.college}
              placeholder="Enter name of your college/school"
              onChange={(event) => setValues((prev) => ({ ...prev, college: event.target.value }))}
            />
            <div className={styles.row}>
            <InputControl
              label="Start year"
              type="number"  
              placeholder="Enter start year of this education"
              value={values.startYear}
              onChange={(event) => setValues((prev) => ({ ...prev, startYear: event.target.value }))}
            />
            <InputControl
              label="end year"
              type="number"  
              placeholder="Enter end year of this education"
              value={values.endYear}
              onChange={(event) => setValues((prev) => ({ ...prev, endYear: event.target.value }))}
            />
            </div>
            <div>
            <InputControl
                label="GPA/Marks(%)"
                type="number"
                placeholder="Enter GPA/Marks(%)"
                value={values.GPA}
                onChange={(event) => setValues((prev) => ({ ...prev, GPA: event.target.value }))}
              />
            </div>
          </div>
        );
      case sections.achievement:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Title"
                value={values.title}
                placeholder="Enter title eg. Competitive Coder"
                onChange={(event) => setValues((prev) => ({ ...prev, title: event.target.value }))}
              />
            </div>
            <InputControl
              label="Overview"
              value={values.overview}
              placeholder="Enter basic overview"
              onChange={(event) => setValues((prev) => ({ ...prev, overview: event.target.value }))}
            />
            <div className={styles.column}>
              <label>Enter description</label>
              <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
              />
              <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
              />
            
            </div>
          </div>
        );
      case sections.summary:
        return (
          <div className={styles.detail}>
            <InputControl
              label="Summary"
              value={values.summary}
              placeholder="Enter your objective/summary"
              onChange={(event) => setValues((prev) => ({ ...prev, summary: event.target.value }))}
            />
          </div>
        );
        case sections.other:
          return (
            <div className={styles.detail}>
              <label>Other</label>
              <ul>
                {values.other && values.other.map((item, index) => (
                  <li key={index}>
                    <InputControl
                      value={item}
                      placeholder={`Item ${index + 1}`}
                      onChange={(event) => {
                        const newOther = [...values.other];
                        newOther[index] = event.target.value;
                        setValues((prev) => ({ ...prev, other: newOther }));
                      }}
                    />
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  const newOther = [...(values.other || []), ""];
                  setValues((prev) => ({ ...prev, other: newOther }));
                }}
              >
                Add Item
              </button>
            </div>
          );
      case sections.positionOfResponsibility:
        return (
          <div className={styles.detail}>
            <div className={styles.row}>
              <InputControl
                label="Title"
                value={values.title}
                placeholder="Enter title"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, title: event.target.value }))
                }
              />
              <InputControl
                label="Position"
                value={values.position}
                placeholder="Enter position"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, position: event.target.value }))
                }
              />
            </div>
            <InputControl
              label="Overview"
              value={values.overview}
              placeholder="Enter overview"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, overview: event.target.value }))
              }
            />
            <div className={styles.column}>
              <label>Description</label>
              <InputControl
                placeholder="Line 1"
                value={values.points ? values.points[0] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 0)}
              />
              <InputControl
                placeholder="Line 2"
                value={values.points ? values.points[1] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 1)}
              />
              <InputControl
                placeholder="Line 3"
                value={values.points ? values.points[2] : ""}
                onChange={(event) => handlePointUpdate(event.target.value, 2)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmission = () => {
    switch (sections[activeSectionKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          name: values.name,
          title: values.title,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };

        setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.workExp: {
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = {
          title: values.title,
          companyName: values.companyName,
          certificationLink: values.certificationLink,
          location: values.location,
          startDate: values.startDate,
          endDate: values.endDate,
          points: values.points,
        };

        setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.project: {
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = {
          title: values.title,
          overview: values.overview,
          link: values.link,
          github: values.github,
          points: values.points,
        };

        setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.education: {
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = {
          title: values.title,
          college: values.college,
          startYear: values.startYear,
          endYear: values.endYear,
          GPA: values.GPA
        };

        setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.achievement: {
        const updatedAchievement = {
          ...information[sections.achievement],
          details: [...information[sections.achievement].details, { title: values.title, overview: values.overview, points: values.points }],
        };
        setInformation((prev) => ({
          ...prev,
          [sections.achievement]: updatedAchievement,
        }));
        break;
      }
      case sections.other: {
        const tempDetail = values.other;
      
        setInformation((prev) => ({
          ...prev,
          [sections.other]: {
            ...prev[sections.other],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;

      }
      case sections.positionOfResponsibility: {
        const tempDetailsPOR = [...information[sections.positionOfResponsibility]?.details];
        tempDetailsPOR[activeDetailIndex] = {
          title: values.title,
          position: values.position,
          overview: values.overview,
          points: values.points,
        };
        setInformation((prev) => ({
          ...prev,
          [sections.positionOfResponsibility]: { ...prev[sections.positionOfResponsibility], details: tempDetailsPOR, sectionTitle },
        }));
        break;
      }
      default:
        break;
    }
  };

  const handleAddNew = () => {
    const details = activeInformation?.details;
    if (!details) return;
    const lastDetail = details.slice(-1)[0];
    if (!Object.keys(lastDetail).length) return;
    details?.push({});

    setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));
    setActiveDetailIndex(details?.length - 1);
  };

  const handleDeleteDetail = (index) => {
    const details = activeInformation?.details ? [...activeInformation?.details] : "";
    if (!details) return;
    details.splice(index, 1);
    setInformation((prev) => ({
      ...prev,
      [sections[activeSectionKey]]: {
        ...information[sections[activeSectionKey]],
        details: details,
      },
    }));

    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${styles.section} ${activeSectionKey === key ? styles.active : ""}`}
            key={key}
            onClick={() => setActiveSectionKey(key)}
          >
            {sections[key]}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <InputControl
          label="Section Title"
          placeholder="Enter section title"
          value={sectionTitle}
          onChange={(event) => setSectionTitle(event.target.value)}
        />
        <div className={styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${styles.chip} ${activeDetailIndex === index ? styles.active : ""}`}
                  key={item.title + index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeSectionKey] === sections.workExp
                      ? item.title
                      : sections[activeSectionKey] === sections.project
                      ? item.title
                      : sections[activeSectionKey] === sections.education
                      ? item.title
                      : sections[activeSectionKey] === sections.achievement
                      ? item.title
                      : sections[activeSectionKey] === sections.positionOfResponsibility
                      ? item.title
                      : item.title}
                  </p>
                  <X onClick={(event) => { event.stopPropagation(); handleDeleteDetail(index); }} />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={styles.new} onClick={handleAddNew}>
              +New
            </div>
          ) : (
            ""
          )}
        </div>
        {generateBody()}
        <button onClick={handleSubmission}>Save</button>
      </div>
    </div>
  );
}

export default Editor;