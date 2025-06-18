"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"
import { useState } from "react"

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [formData, setFormData] = useState({
    memberName: "",
    memberSignature: "",
    date: "",
    agreed: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreed) {
      alert("Please check the agreement checkbox to proceed.")
      return
    }
    if (!formData.memberName || !formData.memberSignature) {
      alert("Please fill in all required fields.")
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Membership agreement submitted successfully! We will contact you soon.")
    setIsSubmitting(false)
    onClose()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-red-600">Stay Hot Baseball Membership Agreement</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 text-sm leading-relaxed">
          <p className="text-gray-700">
            This Membership Agreement ("Agreement") is entered into by and between Stay Hot Baseball ("Stay Hot") and
            the undersigned member ("Member"). By signing this Agreement, the Member agrees to abide by the terms and
            conditions outlined below.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">1. Membership Options & Fees</h3>
            <p className="mb-3">Stay Hot Baseball offers the following membership options:</p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>
                <strong>$125 per month:</strong> (2) field days a month. 3 hours.
              </p>
              <p>
                <strong>$175 per month:</strong> This membership includes 1 practice per week/ 2 field days a month.
              </p>
              <p>
                <strong>$225 per month:</strong> This membership includes 2 practices per week/ 2 field days a month.
              </p>
            </div>
            <p className="mt-3">These fees are due on the 1st or the 15th of each month and are non-refundable.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">2. Commitment & Cancellation Policy</h3>
            <p className="mb-3">
              By becoming a member, the Member commits to the selected program for a monthly cycle. To cancel or resign
              from the program, the Member must provide at least 30 days' written notice to Stay Hot Baseball. Written
              notice must be sent via email to insaenztraining@gmail.com or through any official communication channels
              provided by Stay Hot.
            </p>
            <p className="font-medium">
              <strong>Failure to Provide 30 Days' Notice:</strong> If the Member does not provide the required 30 days'
              written notice, the Member will remain financially responsible for the next month's tuition. No pro-rated
              refunds will be issued for partial months.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">3. Payment Terms</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Payments are due on the 1st or the 15th of each month.</li>
              <li>
                If payment is not received by the 18th or the 3rd of the month, a late fee of $50 will be applied.
              </li>
              <li>
                In the event of non-payment or insufficient payment, Stay Hot Baseball reserves the right to suspend or
                terminate membership privileges until the outstanding balance is settled.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">4. Program Participation</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                The Member is entitled to attend the number of practices per week specified in the selected membership
                tier.
              </li>
              <li>
                Missed practices cannot be rescheduled, and there are no make-up sessions unless explicitly agreed to by
                Stay Hot Baseball.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">5. Program Changes</h3>
            <p>
              Stay Hot Baseball reserves the right to modify the program schedule, fees, and terms of the membership as
              deemed necessary. Members will be notified of any significant changes at least 30 days in advance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">6. Liability Waiver</h3>
            <p>
              By signing this Agreement, the Member acknowledges and agrees to waive any claims against Stay Hot
              Baseball, its coaches, and affiliated staff for any injuries or damages incurred while participating in
              the program. Members are encouraged to carry their own insurance coverage.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">7. Governing Law</h3>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the State of California,
              without regard to its conflict of law principles.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-red-600 mb-4">8. Acknowledgment & Signature</h3>
            <p className="mb-6">
              By completing this form, the Member acknowledges that they have read and understand the terms and
              conditions of this Membership Agreement and agree to abide by them.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="memberName" className="text-sm font-medium">
                  Member Name (Print) *
                </Label>
                <Input
                  id="memberName"
                  type="text"
                  required
                  value={formData.memberName}
                  onChange={(e) => handleInputChange("memberName", e.target.value)}
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="memberSignature" className="text-sm font-medium">
                  Digital Signature *
                </Label>
                <Input
                  id="memberSignature"
                  type="text"
                  required
                  value={formData.memberSignature}
                  onChange={(e) => handleInputChange("memberSignature", e.target.value)}
                  className="mt-1"
                  placeholder="Type your full name as signature"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border">
              <p className="mb-2">
                <strong>Stay Hot Baseball Representative:</strong> Kevin Saenz Jr
              </p>
              <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex items-start space-x-3 mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <Checkbox
                id="agreement"
                checked={formData.agreed}
                onCheckedChange={(checked: boolean) => handleInputChange("agreed", checked as boolean)}
                className="mt-1"
                required
              />
              <Label htmlFor="agreement" className="text-sm font-medium leading-relaxed cursor-pointer">
                <span className="text-red-600">*</span> I acknowledge that I have read, understood, and agree to all
                terms and conditions outlined in this Stay Hot Baseball Membership Agreement. I understand the
                commitment, payment terms, cancellation policy, and liability waiver.
              </Label>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-center font-medium">
              Please contact Stay Hot Baseball at <strong>(209) 814-1132</strong> or{" "}
              <strong>insaenztraining@gmail.com</strong> for any questions or clarifications regarding this Agreement.
            </p>
            <p className="text-center mt-2 text-sm">
              Anything like lessons or league you would have to inquire separately however we are offering custom
              memberships.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.agreed}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Agreement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
