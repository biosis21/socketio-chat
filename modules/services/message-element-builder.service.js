window.Chat = ((ns) => {

    const _buildMessageUserEl = (user) => ns.createElement('span', ['messageUser'], user + ': ');

    const _buildMessageBodyEl = (message) => ns.createElement('span', ['messageBody'], message);

    const _buildMessageEl = ({ message, user }) => {
        const $messageContainer = ns.createElement('li', ['message']);

        $messageContainer.append(
            _buildMessageUserEl(user), 
            _buildMessageBodyEl(message)
        );

        return $messageContainer;
    };

    const _buildMyMessageEl = ({ message }) => {
        const $messageContainer = ns.createElement('li', ['message', 'me']);
        $messageContainer.append(_buildMessageBodyEl(message));
        return $messageContainer;
    };

    const factoryBuildMessageByOwner = (owner, data) => {
        switch(owner) {
            case 'me': 
                return _buildMyMessageEl(data);
            default:
                return _buildMessageEl(data);
        }
    };

    ns.MessageElementBuilderService = {
        factoryBuildMessageByOwner,
    }

    return ns;

})(window.Chat || {});