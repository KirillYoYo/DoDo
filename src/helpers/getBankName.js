export default function getBankName (num) {
	num = parseInt(num);
	switch (num) {
		case 100:
			return 'Банк Газпром'
		case 101:
			return 'Первый межнациональнйы банк'
		case 102:
			return 'Банк UEFA'
		case 103:
			return 'Национальный банк резерва'
	}
}