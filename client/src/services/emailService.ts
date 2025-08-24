import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_k6gqrqr";
const EMAILJS_TEMPLATE_ID = "template_uuw0thv";
const EMAILJS_PUBLIC_KEY = "alJN90IOY3ndBa-Jl";

export interface EmailData {
  from_email: string;
  from_name?: string;
  message: string;
  subject?: string;
}

export class EmailService {
  private static initialized = false;

  static initialize() {
    if (!this.initialized) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      this.initialized = true;
    }
  }

  static async sendEmail(
    data: EmailData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      this.initialize();

      const templateParams = {
        from_email: data.from_email,
        from_name: data.from_name || "Portfolio Contact",
        message: data.message,
        subject: data.subject || "New message from Portfolio",
        to_email: "mathur.prerak@gmail.com", // Your email address
        reply_to: data.from_email,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );

      if (response.status === 200) {
        return {
          success: true,
          message: "Email sent successfully!",
        };
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again or contact directly.",
      };
    }
  }
}
