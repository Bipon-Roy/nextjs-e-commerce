import nodemailer from "nodemailer";

type profile = { name: string; email: string };

interface EmailOptions {
    profile: profile;
    subject: "verification" | "forget-password" | "password=changed";
    linkUrl?: string;
}

const generateMailTransporter = () => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d5684974437f37",
            pass: "281ab103473c82",
        },
    });
    return transport;
};

const sendEmailVerification = async (profile: profile, linkUrl: string) => {
    const transport = generateMailTransporter();
    await transport.sendMail({
        from: "verification@nextjsecom.com",
        to: profile.email,
        html: `<h1>Please verify your email by clicking on <a href="${linkUrl}">this link</a></h1>`,
    });
};

export const sendEmail = (options: EmailOptions) => {
    const { profile, subject, linkUrl } = options;

    switch (subject) {
        case "verification": {
            sendEmailVerification(profile, linkUrl!);
        }
    }
};
