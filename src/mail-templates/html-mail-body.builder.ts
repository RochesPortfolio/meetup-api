import { Persona } from "../entities/persona.entity";
import { MailTemplateType } from "./interfaces/mail-template.type";
import { getSurveyHtmlTemplate } from "./survey.template";



export const buildMailBody = (
    type: MailTemplateType,
    user: Persona,
    hash_invite: string,
    subject: string,
    API_URL: string
): string => {
    const acceptUrl = `${API_URL}/invite/confirm/${hash_invite}`;
    const declineUrl = `${API_URL}/invite/decline/${hash_invite}`;
    switch (type) {
        case 'survey':
            return getSurveyHtmlTemplate({
                title: `${subject}`,
                hiLine: `Hola, ${user.nombres}!`,
                primaryStatement: "Queremos invitarte a este fabuloso evento!",
                happyPath: {
                    text: "Acepto la invitación",
                    link: `${acceptUrl}`
                },
                unHappyPath: {
                    text: "Quizás la próxima vez",
                    link: `${declineUrl}`
                },
                secondaryStatement: "Thanks for your feedback! Want to also leave us a review?",
                secondaryButton: {
                    text: "Sure!",
                    link: "https://www.facebook.com"
                },
                footerInfo: "Where to find us: \n Address line 1234, State, Country",
            });

        default:
            return getSurveyHtmlTemplate({
                title: "How did you like your food?",
                hiLine: "Hey there, Jane!",
                primaryStatement: "We're always striving to be better, that's why your opinion is so important to us. Would you mind telling us how did your last order go?",
                happyPath: {
                    text: "I loved it!",
                    link: "https://www.google.com"
                },
                unHappyPath: {
                    text: "I didn't like it",
                    link: "https://www.google.com"
                },
                secondaryStatement: "Thanks for your feedback! Want to also leave us a review?",
                secondaryButton: {
                    text: "Sure!",
                    link: "https://www.google.com"
                },
                footerInfo: "Where to find us: \n Address line 1234, State, Country",
            });
    }
}