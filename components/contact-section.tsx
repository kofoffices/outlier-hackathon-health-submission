"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="py-12 px-4" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold pixel-font mb-2">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about HealthQuest? We're here to help you on your wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
            <h3 className="text-xl font-bold pixel-font mb-4">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-800"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-800"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-800"
                  placeholder="Question about HealthQuest"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold mb-1">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="border-2 border-gray-800 min-h-[120px]"
                  placeholder="Type your message here..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
              <h3 className="text-xl font-bold pixel-font mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-bold">Email Us</p>
                    <a href="mailto:support@healthtrackerpro.com" className="text-blue-600 hover:underline">
                      support@healthtrackerpro.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-bold">Call Us</p>
                    <a href="tel:+18005551234" className="text-blue-600 hover:underline">
                      +1 (800) 555-1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-bold">Visit Us</p>
                    <address className="not-italic">
                      123 Wellness Street
                      <br />
                      Health City, HC 98765
                      <br />
                      United States
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
              <h3 className="text-xl font-bold pixel-font mb-4">Support Hours</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold">Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Saturday:</span>
                  <span>10:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-gray-200">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] bg-blue-50 hover:bg-blue-100"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Start Live Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
