'use server';

import { z } from 'zod';

// Define a validation schema for the form input
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
  projectType: z.enum(['consultation', 'collaboration', 'hiring', 'speaking', 'other'])
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

export async function sendEmail(formData: ContactFormData) {
  // Validate the form data
  const validationResult = ContactFormSchema.safeParse(formData);
  
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.format(),
      message: 'Validation failed. Please check your inputs.'
    };
  }
  
  // This would be where you integrate with an email service like SendGrid, Mailgun, etc.
  // For now, we'll just log the data and return a success response
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form data received:', formData);
    
    // In a real implementation, you would send an email here
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'vanraj.narula@gmail.com',
      from: formData.email,
      subject: `Portfolio Contact [${formData.projectType}]: ${formData.subject}`,
      text: `Message from ${formData.name} (${formData.email})${formData.company ? ' at ' + formData.company : ''}:\n\n${formData.message}`,
      html: `<p><strong>From:</strong> ${formData.name} (${formData.email})</p>
             ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
             <p><strong>Project Type:</strong> ${formData.projectType}</p>
             <p><strong>Subject:</strong> ${formData.subject}</p>
             <p><strong>Message:</strong></p>
             <p>${formData.message.replace(/\n/g, '<br>')}</p>`
    });
    */
    
    return {
      success: true,
      message: 'Thank you for your message. I will get back to you soon!'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      success: false,
      message: 'Failed to send message. Please try again later.'
    };
  }
}
