import React,{useEffect} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import {StreamChat} from 'stream-chat';
import { useChatClient } from './useChatClient';
import {AppProvider, useAppContext} from './AppContext';
import {
    Channel,
    MessageList,
    MessageInput,
    Chat,
    OverlayProvider,
    ChannelList,
} from 'stream-chat-react-native';
import { chatApiKey, chatUserId } from './chatConfig';

const filters = {
    members: {
        '$in': [chatUserId]
    },
};

const sort = {
    last_message_at: -1,
};


const Stack = createStackNavigator();
const chatClient = StreamChat.getInstance(chatApiKey);


const HomeScreen = () => <Text>Home Screen</Text>;
const ChannelScreen = () => {
    const { channel } = useAppContext();
    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );

}
const ChannelListScreen = props => {
    const { setChannel } = useAppContext();
    return(   <ChannelList
        filters={filters}
        sort={sort}
    />
);

}

const NavigationStack = () => {
    const { clientIsReady } = useChatClient();

    if (!clientIsReady) {
        return <Text>Loading chat ...</Text>
    }
    return (
        <OverlayProvider>
            <Chat client={chatClient}>
            <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name="ChannelList" component={ChannelListScreen} />
            </Stack.Navigator>
            </Chat>
        </OverlayProvider>
    );
};

export default () => {

    return (
        <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <NavigationStack />
            </NavigationContainer>
        </SafeAreaView>
        </GestureHandlerRootView>
        </AppProvider>


    );
};
