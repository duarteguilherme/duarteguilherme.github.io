let current_state = '#no';
let states = {
    'no': 0,
    'first': 0,
    'conf': 0
}
let max_states = {
    'no': 0,
    'first': 3,
    'conf': 2
}

function reset_states() {
    states = {
        'no': 0,
        'first': 0,
        'conf': 0
    }
}

function maximize_states() {
    states = {...max_states};
}

