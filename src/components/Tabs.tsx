import React from 'react';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  initialTab?: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  return (
    <div>
      <div className="flex border-b border-gray-700 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`py-2 px-4 text-sm font-medium 
                        ${
                          activeTab === index
                            ? 'border-b-2 border-teal-400 text-teal-400'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs; 