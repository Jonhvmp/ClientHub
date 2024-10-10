// Arquivo: RecentActivities.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockCounterClockwise, CaretDown } from 'phosphor-react';

const RecentActivities = ({ clients }) => {
  const [expandedClientId, setExpandedClientId] = useState(null);

  const toggleExpand = (clientId) => {
    setExpandedClientId(expandedClientId === clientId ? null : clientId);
  };

  const iconVariants = {
    hidden: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
    visible: { pathLength: 1, fill: "rgba(255, 0, 0, 1)", transition: { duration: 1.5 } },
  };

  return (
    <div className="recent-activities mt-12">
      <h2 className="text-3xl text-red-700 font-bold mb-6">Atividades Recentes</h2>
      {clients.map((client) => (
        <div key={client._id} className="mb-4">
          <motion.div
            className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
            onClick={() => toggleExpand(client._id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="text-red-600"
                initial="hidden"
                animate="visible"
                variants={iconVariants}
              >
                <ClockCounterClockwise size={32} weight="fill" />
              </motion.div>
              <p className="text-gray-700 font-semibold">
                {client.name}
              </p>
            </div>
            <CaretDown size={24} className={`transition-transform ${expandedClientId === client._id ? 'rotate-180' : ''}`} />
          </motion.div>

          {expandedClientId === client._id && (
            <motion.div
              className="bg-gray-100 rounded-lg shadow-inner p-4 mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {client.history && client.history.length > 0 ? (
                <ul className="list-disc ml-6">
                  {client.history.map((activity, index) => (
                    <motion.li
                      key={index}
                      className="mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {activity.action} em {new Date(activity.date).toLocaleString()}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Nenhuma atividade recente.</p>
              )}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;
