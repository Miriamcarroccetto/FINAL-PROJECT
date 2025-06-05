import React, { useEffect, useState } from 'react'
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceAuthor from './experience-author/ExperienceAuthor';

export default function Experience() {

    const [experience, setExperience] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchExperience = async () => {
            try {

                const { id } = params
                const response = await fetch(`${import.meta.env.VITE_APIURL}/experiences/${id}`)

                if (!response.ok) {
                    throw new Error("Esperienza non trovata")
                }

                const data = await response.json()
                setExperience(data)
                setLoading(false)
            } catch (err) {
                console.error("Errore nel caricamento del post: ", err)
                navigate("/404")
            }
        }

        fetchExperience()
    }, [params, navigate])

    if (loading) {
        return <div>loading</div>
    }

    return (
        <div className="experience-details-root">
            <Container>
                <Image className="experience-details-cover" src={experience.image} fluid />
                <h1 className="experience-details-title">{experience.title}</h1>

                <div className="experience-details-container">
                    <div className="experience-details-author">
                        <ExperienceAuthor {...experience.user} />
                    </div>

                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: experience.description,
                    }}
                ></div>
            </Container>
        </div>
    );
}


