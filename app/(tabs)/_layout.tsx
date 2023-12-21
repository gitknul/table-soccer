import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: 0 }} {...props} />;
}

type TabProps = {
    name: string;
    options: {
        title: string;
        icon: React.ComponentProps<typeof FontAwesome>['name'];
    }
}

const tabs: TabProps[] = [
    {
        name: 'index',
        options: {
            title: 'Wedstrijd',
            icon: "soccer-ball-o",
        }
    },
    {
        name: 'settings',
        options: {
            title: 'Instellingen',
            icon: 'gear',
        }
    },
]

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
        {tabs.map((tab) => (
          <Tabs.Screen name={tab.name} key={tab.name} options={{title: tab.options.title,tabBarIcon: ({ color }) => <TabBarIcon name={tab.options.icon} color={color} /> }} />
        ))}
    </Tabs>
  );
}
