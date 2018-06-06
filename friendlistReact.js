<!-- it works but remove all commit out stuff, its messing with bable -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<title> learning react </title>
	<link rel="stylesheet" href="style.css">
	<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
	<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
	<script crossorigin src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
	<!-- // <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script> -->
</head>
<body >

	<div id="app"></div>


	<script type="text/babel">
		function ActiveFriends (props) {
			return (
				<div>
				<h2>Active Friends</h2>
				<ul> 
					{props.list.map((friend) => (
						<li key={friend.name}>
							<span>{friend.name}</span>
							<button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
							<button onClick={() => props.onToggleFriend(friend.name)}>Deactivate</button>
						</li>
					))}
				</ul>
				</div>
			)
		}
		function InactiveFriends (props) {
			return (
				<div>
				<h2>Inactive Friends</h2>
				<ul> 
					{props.list.map((friend) => (
						<li key={friend.name}>
							<span>{friend.name}</span>
							<button onClick={() => props.onToggleFriend(friend.name)}>Activate</button>
						</li>
					))}
				</ul>
				</div>
			)
		}
		// function FriendsList (props) {
		// 	return (
		// 		<ul> 
		// 			{props.list.map((friend) => (
		// 				<li key={friend.name}>
		// 					<span>{friend.name}</span>
		// 					<button onClick={() => props.onRemoveFriend(friend.name)}>Remove</button>
		// 				</li>
		// 			))}
		// 		</ul>
		// 	)
		// }

		class App extends React.Component {
			constructor(props) {
				super(props)

				this.state = {
					friends: [
						{ 
							name: 'Jordan', 
							active: true,
						},
						{
							name: 'Katie',
							active: true,
						},
						{
							name:'Nemos',
							active: false,
						}
					],
					input: ''
				}


				this.handleRemoveFriend = this.handleRemoveFriend.bind(this)  //this (this) makes it works because of the 'bind' keyword, so instead of this pointing to props its now point to app
				this.updateInput = this.updateInput.bind(this)
				this.handleAddFriend = this.handleAddFriend.bind(this)
				this.handleToggleFriend = this.handleToggleFriend.bind(this)
			}
			handleAddFriend() {
				this.setState((currentState) => {
					return {
						friends: currentState.friends.concat([{
							name: currentState.input,
							active: true,
						}]),
						input: ''
					}
				})
			}
			handleRemoveFriend(name) {
				this.setState((currentState) => {
					return {
						friends: currentState.friends.filter((friend) => friend.name !== name),
						input: '',
					}
				})
			}
			handleToggleFriend(name) {
				this.setState((currentState) => {
					const friend = currentState.friends.find((friend) => friend.name === name)

					return {
						friends: currentState.friends.filter((friend) => friend.name !== name)
						.concat ([{
							name,
							active: !friend.active
						}])
					}
				})
			}
			updateInput(e) {
				const value = e.target.value

				this.setState({ //() => ({    use this if only you care what the current state is
					input: value
				})
			}
			render() { // the UI (DOM)  ALSO it doesn't work unless its *bind*
				return (
					<div>
						<input 
							type = 'text' 
							placeholder='new friend' 
							value={this.state.input} 
							onChange={this.updateInput}/>
						<button onClick={this.handleAddFriend}>Submit</button> <br />
						<button onClick={() => this.setState({ friends:[]})}>Clear All</button>
						<ActiveFriends 
							onRemoveFriend = {this.handleRemoveFriend}
							list = {this.state.friends.filter((friend) => friend.active === true)}
							onToggleFriend = {this.handleToggleFriend}/>
						<InactiveFriends 
							list = {this.state.friends.filter((friend) => friend.active === false)}
							onToggleFriend = {this.handleToggleFriend}/>
						// <FriendsList 
						// 	list = {this.state.friends} 
						// 	onRemoveFriend = {this.handleRemoveFriend}/>
					</ div>
				)
			}
		}

		ReactDOM.render(
			<App />,
			document.getElementById('app')
			)
	</script>
	<!-- // <script src="main.js"></script> -->
</body>
</html>