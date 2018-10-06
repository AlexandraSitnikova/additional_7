function used_in_row(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
			return true;
		}
  }

	return false;
}


function used_in_col(matrix, col, num) {
	for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }

	return false;
}


function used_in_box(matrix, box_start_row, box_start_col, num) {
	for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + box_start_row][col + box_start_col] === num) {
				return true;
			}
    }
  }

	return false;
}


function is_safe(matrix, row, col, num) {
	return !used_in_row(matrix, row, num) &&
		!used_in_col(matrix, col, num) &&
		!used_in_box(matrix, row - row % 3, col - col % 3, num);
}

function get_unassigned_location(matrix) {
	for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      if (matrix[row][col] === 0) {
				return [row, col];
			}
    }
  }

	return "GRID_FULL";
}


function solve_soduko(matrix) {
	if (get_unassigned_location(matrix) === "GRID_FULL") {
		return true; 
	}

	let row_and_col = get_unassigned_location(matrix);
	let row = row_and_col[0];
	let col = row_and_col[1];

	for (let num = 1; num <= 9; num++) {
		if (is_safe(matrix, row, col, num)) {
			matrix[row][col] = num;
			if (solve_soduko(matrix)) {
				return true;
			}

			matrix[row][col] = 0;
		}
	}

	return false; 
}

module.exports = function solveSudoku(matrix) {
  solve_soduko(matrix);
  return matrix;
}
