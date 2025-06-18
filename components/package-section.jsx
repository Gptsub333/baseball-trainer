"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import MembershipModal from "./membership-model"
export default function PackageSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      

      {/* Membership Agreement Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Membership Options</h2>
            <p className="text-muted-foreground text-base md:text-lg mb-8">
              Join our membership program for regular training sessions and field days. Custom memberships available
              upon inquiry.
            </p>

            <div className="bg-slate-50 border border-gray-200 rounded-xl p-8 mb-8">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Basic</h3>
                  <p className="text-2xl font-bold mb-2">$125/month</p>
                  <p className="text-sm text-gray-600">2 field days • 3 hours</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Standard</h3>
                  <p className="text-2xl font-bold mb-2">$175/month</p>
                  <p className="text-sm text-gray-600">1 practice/week • 2 field days</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <h3 className="text-xl font-semibold text-red-600 mb-2">Premium</h3>
                  <p className="text-2xl font-bold mb-2">$225/month</p>
                  <p className="text-sm text-gray-600">2 practices/week • 2 field days</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3"
                onClick={() => window.open("tel:209-814-1132")}
              >
                Call to Join: (209) 814-1132
              </Button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 shadow-lg border-2 border-red-500 "
                  onClick={() => setIsModalOpen(true)}
                >
                  View & Sign Membership Agreement
                </Button>
              </motion.div>
            </motion.div>

            <p className="text-sm text-gray-500 mt-6">
              Lessons, leagues, and custom memberships available - please inquire separately
            </p>
          </motion.div>
        </div>
      </section>

      <MembershipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
