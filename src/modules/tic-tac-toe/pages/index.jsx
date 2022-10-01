import 'modules/tic-tac-toe/assets/style/index.css'

import { useState } from 'react'

import { calculateWinner } from 'utils'

import Game from '../components/Game'
import Toggle from 'common/components/Toggle'

// let size = parseInt(prompt('Nhập số hàng/cột: ')) // Số hàng/cột
// if (!size) size = 7

function TikTacToe() {
	const [input, setInput] = useState(7)
	const [size, setSize] = useState(7)
	const [history, setHistory] = useState([
		{
			squares: Array(size * size).fill(null),
			location: {
				x: null,
				y: null,
			},
		},
	])
	const [stepNumber, setStepNumber] = useState(0)
	const [isXNext, setIsXNext] = useState(true)
	const [winner, setWinner] = useState({ player: false, location: [] })
	const [isToggleSort, setIsToggleSort] = useState(true)

	const handleNewGame = () => {
		setSize(parseInt(input))
		setHistory([
			{
				squares: Array(input * input).fill(null),
				location: {
					x: null,
					y: null,
				},
			},
		])
		setStepNumber(0)
		setIsXNext(true)
		setWinner({ player: false, location: [] })
		setIsToggleSort(true)
	}
	const handleSquareClick = (i) => {
		if (winner.player) {
			return
		}

		const _history = history.slice(0, stepNumber + 1)
		const current = _history[_history.length - 1]
		const squares = current.squares.slice()

		if (squares[i]) {
			return
		}

		const isWinner = calculateWinner(squares, isXNext, i, size)
		if (isWinner.player) {
			setWinner(isWinner)
		}

		squares[i] = isXNext ? 'X' : 'O'

		setHistory([
			..._history,
			{
				squares: squares,
				location: {
					x: i % size,
					y: Math.floor(i / size),
				},
				isX: isXNext,
			},
		])

		setStepNumber(_history.length)
		setIsXNext(!isXNext)
	}

	const handleJumpTo = (step) => {
		if (step !== history.length - 1) {
			setWinner(false)
		}
		setStepNumber(step)
		setIsXNext(step % 2 === 0)
	}

	const handleToggle = () => {
		setIsToggleSort((cur) => !cur)
	}

	return (
		<div className='container'>
			<h1>Tic Tac Toe</h1>
			<div className='form'>
				<label htmlFor='size'>Size:</label>
				<input
					name='size'
					type='number'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Nhập kích thước:'
				/>
				<button onClick={handleNewGame}>Enter</button>
				<div className='toggle'>
					<span>{isToggleSort ? 'Ascending' : 'Descending'}</span>
					<Toggle isOn={isToggleSort} handleToggle={handleToggle} />
				</div>
			</div>

			<div className='game'>
				<Game
					size={size}
					winner={winner}
					history={history}
					sorting={isToggleSort}
					stepNumber={stepNumber}
					xIsNext={isXNext}
					jumpTo={handleJumpTo}
					onSquareClick={handleSquareClick}
				/>
			</div>
		</div>
	)
}

export default TikTacToe
