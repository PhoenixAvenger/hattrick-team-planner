const main = document.querySelector('#main');
const navItems = document.querySelectorAll('#navigation div');
const sections = document.querySelectorAll('section');

navItems.forEach((item) => {
    item.addEventListener('click', function(e) {
        navItems.forEach((i) => {
            i.classList.remove('active');
        });
        item.classList.add('active');
        sections.forEach((s) => {
            s.classList.add('hidden');
        });
        main.querySelector('.' + item.getAttribute('data-tab')).classList.remove('hidden');
    })
});

setupContributionPlayers();
setupIdealSkillPlayers();

function setupContributionPlayers() {
    const players = main.querySelectorAll('.calculate-contributions .player');
    players.forEach((player) => {
        player.querySelector('.position').addEventListener('change', function(e) {
            let value = player.querySelector('.position').value;
            let alignment = player.querySelector('.alignment')
            let options = alignment.querySelectorAll('option');
            if(value == 'Forward') {
                options.forEach((option) => {
                    if(option.value == 'Towards Middle' || option.value == 'Towards Attack') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
            } else if(value == 'Central Defender Middle' || value == 'Central Defender Outside') {
                options.forEach((option) => {
                    if(option.value == 'Towards Defense' || option.value == 'Towards Middle' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
            } else if(value == 'Wing Back') {
                options.forEach((option) => {
                    if(option.value == 'Towards Wing') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
            } else if(value == 'Inner Midfielder Middle' || value == 'Inner Midfielder Outside') {
                options.forEach((option) => {
                    if(option.value == 'Towards Middle' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
            } else if(value == 'Winger') {
                options.forEach((option) => {
                    if(option.value == 'Towards Wing' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
            }
        });


        let selectors = player.querySelectorAll('select');
        selectors.forEach((selector) => {
            selector.addEventListener('change', function(e) {
                updateContributionPlayer(player);
            });
        });
    });
}

function updateContributionPlayer(player) {
    let defending = parseFloat(player.querySelector('.attribute-row[data-attribute="defending"] select').value);
    let playmaking = parseFloat(player.querySelector('.attribute-row[data-attribute="playmaking"] select').value);
    let winger = parseFloat(player.querySelector('.attribute-row[data-attribute="winger"] select').value);
    let passing = parseFloat(player.querySelector('.attribute-row[data-attribute="passing"] select').value);
    let scoring = parseFloat(player.querySelector('.attribute-row[data-attribute="scoring"] select').value);

    let position = player.querySelector('.details .position').value;
    let alignment = player.querySelector('.details .alignment').value;

    let defenseSide = parseFloat(0.0);
    let defenseCentral = parseFloat(0.0);
    let midfield = parseFloat(0.0);
    let attackSide = parseFloat(0.0);
    let attackCentral = parseFloat(0.0);

    if(position == 'Wing Back' && alignment == 'Default') {
        defenseSide += (defending * .92);
        defenseCentral += (defending * .38);
        midfield += (playmaking * .15);
        attackSide += (winger * .59);
    } else if(position == 'Wing Back' && alignment == 'Towards Defense') {
        defenseSide += (defending * 1);
        defenseCentral += (defending * .43);
        midfield += (playmaking * .10);
        attackSide += (winger * .45);
    } else if(position == 'Wing Back' && alignment == 'Towards Middle') {
        defenseSide += (defending * .75);
        defenseCentral += (defending * .70);
        midfield += (playmaking * .20);
        attackSide += (winger * .35);
    } else if(position == 'Wing Back' && alignment == 'Towards Attack') {
        defenseSide += (defending * .74);
        defenseCentral += (defending * .35);
        midfield += (playmaking * .20);
        attackSide += (winger * .69);
    } else if(position == 'Central Defender Middle' && alignment == 'Default') {
        defenseSide += (defending * .26);
        defenseCentral += (defending * 1);
        midfield += (playmaking * .25);
    } else if(position == 'Central Defender Outside' && alignment == 'Default') {
        defenseSide += (defending * .52);
        defenseCentral += (defending * 1);
        midfield += (playmaking * .25);
    } else if(position == 'Central Defender' && alignment == 'Towards Wing') {
        defenseSide += (defending * .81);
        defenseCentral += (defending * .67);
        midfield += (playmaking * .15);
        attackSide += (winger * .26);
    } else if(position == 'Central Defender Middle' && alignment == 'Towards Attack') {
        defenseSide += (defending * .20);
        defenseCentral += (defending * .73);
        midfield += (playmaking * .40);
    } else if(position == 'Central Defender Outside' && alignment == 'Towards Attack') {
        defenseSide += (defending * .40);
        defenseCentral += (defending * .73);
        midfield += (playmaking * .40);
    } else if(position == 'Winger' && alignment == 'Default') {
        defenseSide += (defending * .35);
        defenseCentral += (defending * .20);
        midfield += (playmaking * .45);
        attackSide += (winger * .86);
        attackSide += (passing * .26);
        attackCentral += (passing * .11);
    } else if(position == 'Winger' && alignment == 'Towards Defense') {
        defenseSide += (defending * .61);
        defenseCentral += (defending * .25);
        midfield += (playmaking * .30);
        attackSide += (winger * .69);
        attackSide += (passing * .21);
        attackCentral += (passing * .05);
    } else if(position == 'Winger' && alignment == 'Towards Middle') {
        defenseSide += (defending * .29);
        defenseCentral += (defending * .25);
        midfield += (playmaking * .55);
        attackSide += (winger * .74);
        attackSide += (passing * .15);
        attackCentral += (passing * .16);
    } else if(position == 'Winger' && alignment == 'Towards Attack') {
        defenseSide += (defending * .22);
        defenseCentral += (defending * .13);
        midfield += (playmaking * .30);
        attackSide += (winger * 1);
        attackSide += (passing * .29);
        attackCentral += (passing * .13);
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Default') {
        defenseSide += (defending * .09);
        defenseCentral += (defending * .40);
        midfield += (playmaking * 1);
        attackSide += (passing * .13);
        attackCentral += (passing * .33);
        attackCentral += (scoring * .22);
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Default') {
        defenseSide += (defending * .19);
        defenseCentral += (defending * .40);
        midfield += (playmaking * 1);
        attackSide += (passing * .26);
        attackCentral += (passing * .33);
        attackCentral += (scoring * .22);
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Towards Defense') {
        defenseSide += (defending * .14);
        defenseCentral += (defending * .58);
        midfield += (playmaking * .95);
        attackSide += (passing * .07);
        attackCentral += (passing * .18);
        attackCentral += (scoring * .13);
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Towards Defense') {
        defenseSide += (defending * .27);
        defenseCentral += (defending * .58);
        midfield += (playmaking * .95);
        attackSide += (passing * .14);
        attackCentral += (passing * .18);
        attackCentral += (scoring * .13);
    } else if(position == 'Inner Midfielder' && alignment == 'Towards Wing') {
        defenseSide += (defending * .24);
        defenseCentral += (defending * .33);
        midfield += (playmaking * .90);
        attackSide += (passing * .31);
        attackSide += (winger * .59);
        attackCentral += (passing * .23);
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Towards Attack') {
        defenseSide += (defending * .04);
        defenseCentral += (defending * .16);
        midfield += (playmaking * .95);
        attackSide += (passing * .18);
        attackCentral += (passing * .49);
        attackCentral += (scoring * .31);
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Towards Attack') {
        defenseSide += (defending * .09);
        defenseCentral += (defending * .16);
        midfield += (playmaking * .95);
        attackSide += (passing * .36);
        attackCentral += (passing * .49);
        attackCentral += (scoring * .31);
    } else if(position == 'Forward' && alignment == 'Default') {
        attackSide += (scoring * .221);
        attackSide += (winger * .18);
        attackSide += (passing * .121);
        attackCentral += (scoring * 1);
        attackCentral += (passing * .369);
        midfield += (playmaking * .25);
    } else if(position == 'Forward' && alignment == 'Towards Defense') {
        attackSide += (scoring * .13);
        attackSide += (winger * .13);
        attackSide += (passing * .31);
        attackCentral += (scoring * .56);
        attackCentral += (passing * .53);
        midfield += (playmaking * .35);
    } else if(position == 'Forward' && alignment == 'Towards Defense [Tech]') {
        attackSide += (scoring * .13);
        attackSide += (winger * .13);
        attackSide += (passing * .41);
        attackCentral += (scoring * .56);
        attackCentral += (passing * .53);
        midfield += (playmaking * .35);
    } else if(position == 'Forward' && alignment == 'Towards Wing') {
        attackSide += (scoring * .70);
        attackSide += (winger * .85);
        attackSide += (passing * .27);
        attackCentral += (scoring * .66);
        attackCentral += (passing * .23);
        midfield += (playmaking * .15);
    }

    player.querySelector('.contribution-row[data-contribution="defense-side"] .contribution-score').innerHTML = (Math.floor(defenseSide * 100) / 100);
    player.querySelector('.contribution-row[data-contribution="defense-central"] .contribution-score').innerHTML = (Math.floor(defenseCentral * 100) / 100);
    player.querySelector('.contribution-row[data-contribution="midfield"] .contribution-score').innerHTML = (Math.floor(midfield * 100) / 100);
    player.querySelector('.contribution-row[data-contribution="attack-side"] .contribution-score').innerHTML = (Math.floor(attackSide * 100) / 100);
    player.querySelector('.contribution-row[data-contribution="attack-central"] .contribution-score').innerHTML = (Math.floor(attackCentral * 100) / 100);
}

function setupIdealSkillPlayers() {
    const players = main.querySelectorAll('.calculate-ideal-skills .player');
    players.forEach((player) => {
        let secondaryScale = player.querySelector('.scale-row input');
        let secondaryScaleLabel = player.querySelector('.scale-row span');
        secondaryScale.addEventListener('input', function(e) {
            secondaryScaleLabel.innerHTML = secondaryScale.value;
            updateIdealSkillPlayer(player);
        });

        player.querySelector('.position').addEventListener('change', function(e) {
            let value = player.querySelector('.position').value;
            let alignment = player.querySelector('.alignment')
            let options = alignment.querySelectorAll('option');
            let attributes = player.querySelectorAll('.attribute-row');


            if(value == 'Forward') {
                options.forEach((option) => {
                    if(option.value == 'Towards Middle' || option.value == 'Towards Attack') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
                attributes.forEach((attribute) => {
                    if(attribute.getAttribute('data-attribute') == 'scoring') {
                        attribute.classList.remove('hidden');
                    } else {
                        attribute.classList.add('hidden');
                    }
                });
            } else if(value == 'Central Defender Middle' || value == 'Central Defender Outside') {
                options.forEach((option) => {
                    if(option.value == 'Towards Defense' || option.value == 'Towards Middle' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
                attributes.forEach((attribute) => {
                    if(attribute.getAttribute('data-attribute') == 'defending') {
                        attribute.classList.remove('hidden');
                    } else {
                        attribute.classList.add('hidden');
                    }
                });
            } else if(value == 'Wing Back') {
                options.forEach((option) => {
                    if(option.value == 'Towards Wing' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
                attributes.forEach((attribute) => {
                    if(attribute.getAttribute('data-attribute') == 'defending') {
                        attribute.classList.remove('hidden');
                    } else {
                        attribute.classList.add('hidden');
                    }
                });
            } else if(value == 'Inner Midfielder Middle' || value == 'Inner Midfielder Outside') {
                options.forEach((option) => {
                    if(option.value == 'Towards Middle' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
                attributes.forEach((attribute) => {
                    if(attribute.getAttribute('data-attribute') == 'playmaking') {
                        attribute.classList.remove('hidden');
                    } else {
                        attribute.classList.add('hidden');
                    }
                });
            } else if(value == 'Winger') {
                options.forEach((option) => {
                    if(option.value == 'Towards Wing' || option.value == 'Towards Defense [Tech]') {
                        option.classList.add('hidden');
                    } else {
                        option.classList.remove('hidden');
                    }
                });
                attributes.forEach((attribute) => {
                    if(attribute.getAttribute('data-attribute') == 'winger') {
                        attribute.classList.remove('hidden');
                    } else {
                        attribute.classList.add('hidden');
                    }
                });
            }
        });

        let selectors = player.querySelectorAll('select');
        selectors.forEach((selector) => {
            selector.addEventListener('change', function(e) {
                updateIdealSkillPlayer(player);
            });
        });

        let findWages = player.querySelector('.estimate-wages');
        if(findWages) {
            findWages.addEventListener('click', function(e) {
                let url = findWages.getAttribute('data-url');
                if(url) {
                    window.open(url, '_blank').focus();
                }
            });
        }
    });
}

function updateIdealSkillPlayer(player) {
    let attribute = player.querySelector('.attribute-row:not(.hidden)');
    let score = parseFloat(player.querySelector('.attribute-row:not(.hidden) select').value);
    let secondaryScale = parseFloat(player.querySelector('.scale-row input').value);
    let findWages = player.querySelector('.estimate-wages');
    
    let position = player.querySelector('.details .position').value;
    let alignment = player.querySelector('.details .alignment').value;

    let defending = parseFloat(1.0);
    let playmaking = parseFloat(1.0);
    let winger = parseFloat(1.0)
    let passing = parseFloat(1.0);
    let scoring = parseFloat(1.0);

    if(position == 'Wing Back' && alignment == 'Default') {
        defending = score;
        playmaking = (score * 0.115384615384615) * secondaryScale;
        winger = (score * 0.453846153846154) * secondaryScale;
    } else if(position == 'Wing Back' && alignment == 'Towards Defense') {
        defending = score;
        playmaking = (score * 0.06993006993007) * secondaryScale;
        winger = (score * 0.314685314685315) * secondaryScale;
    } else if(position == 'Wing Back' && alignment == 'Towards Middle') {
        defending = score;
        playmaking = (score * 0.137931034482759) * secondaryScale;
        winger = (score * 0.241379310344828) * secondaryScale;
    } else if(position == 'Wing Back' && alignment == 'Towards Attack') {
        defending = score;
        playmaking = (score * 0.18348623853211) * secondaryScale;
        winger = (score * 0.63302752293578) * secondaryScale;
    } else if(position == 'Central Defender Middle' && alignment == 'Default') {
        defending = score;
        playmaking = (score * 0.198412698412698) * secondaryScale;
    } else if(position == 'Central Defender Outside' && alignment == 'Default') {
        defending = score;
        playmaking = (score * 0.164473684210526) * secondaryScale;
    } else if(position == 'Central Defender Middle' && alignment == 'Towards Wing') {
        defending = score;
        playmaking = (score * 0.101351351351351) * secondaryScale;
        winger = (score * 0.175675675675676) * secondaryScale;
    } else if(position == 'Central Defender Outside' && alignment == 'Towards Wing') {
        defending = score;
        playmaking = (score * 0.101351351351351) * secondaryScale;
        winger = (score * 0.175675675675676) * secondaryScale;
    } else if(position == 'Central Defender Middle' && alignment == 'Towards Attack') {
        defending = score;
        playmaking = (score * 0.43010752688172) * secondaryScale;
    } else if(position == 'Central Defender Outside' && alignment == 'Towards Attack') {
        defending = score;
        playmaking = (score * 0.353982300884956) * secondaryScale;
    } else if(position == 'Winger' && alignment == 'Default') {
        winger = score;
        defending = (score * 0.63953488372093) * secondaryScale;
        playmaking = (score * 0.523255813953488) * secondaryScale;
        passing = (score * 0.430232558139535) * secondaryScale;
    } else if(position == 'Winger' && alignment == 'Towards Defense') {
        winger = score;
        defending = (score * 1.246376811594203) * secondaryScale;
        playmaking = (score * 0.434782608695652) * secondaryScale;
        passing = (score * 0.376811594202899) * secondaryScale;
    } else if(position == 'Winger' && alignment == 'Towards Middle') {
        winger = score;
        defending = (score * 0.72972972972973) * secondaryScale;
        playmaking = (score * 0.743243243243243) * secondaryScale;
        passing = (score * 0.418918918918919) * secondaryScale;
    } else if(position == 'Winger' && alignment == 'Towards Attack') {
        winger = score;
        defending = (score * 0.35) * secondaryScale;
        playmaking = (score * 0.30) * secondaryScale;
        passing = (score * 0.42) * secondaryScale;
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Default') {
        playmaking = score;
        defending = (score * 0.49) * secondaryScale;
        passing = (score * 0.46) * secondaryScale;
        scoring = (score * 0.22) * secondaryScale;
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Default') {
        playmaking = score;
        defending = (score * 0.59) * secondaryScale;
        passing = (score * 0.59) * secondaryScale;
        scoring = (score * 0.22) * secondaryScale;
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Towards Defense') {
        playmaking = score;
        defending = (score * 0.757894736842105) * secondaryScale;
        passing = (score * 0.263157894736842) * secondaryScale;
        scoring = (score * 0.136842105263158) * secondaryScale;
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Towards Defense') {
        playmaking = score;
        defending = (score * 1.052631578947368) * secondaryScale;
        passing = (score * 0.336842105263158) * secondaryScale;
        scoring = (score * 0.136842105263158) * secondaryScale;
    } else if(position == 'Inner Midfielder' && alignment == 'Towards Wing') {
        playmaking = score;
        defending = (score * 0.633333333333333) * secondaryScale;
        passing = (score * 0.6) * secondaryScale;
        winger = (score * 0.655555555555556) * secondaryScale;
    } else if(position == 'Inner Midfielder Middle' && alignment == 'Towards Attack') {
        playmaking = score;
        defending = (score * 0.210526315789474) * secondaryScale;
        passing = (score * 0.705263157894737) * secondaryScale;
        scoring = (score * 0.326315789473684) * secondaryScale;
    } else if(position == 'Inner Midfielder Outside' && alignment == 'Towards Attack') {
        playmaking = score;
        defending = (score * 0.263157894736842) * secondaryScale;
        passing = (score * 0.894736842105263) * secondaryScale;
        scoring = (score * 0.326315789473684) * secondaryScale;
    } else if(position == 'Forward' && alignment == 'Default') {
        scoring = score;
        playmaking = (score * 0.204750204750205) * secondaryScale;
        winger = (score * 0.21978) * secondaryScale;
        passing = (score * 0.401310401310401) * secondaryScale;
    } else if(position == 'Forward' && alignment == 'Towards Defense') {
        scoring = score;
        playmaking = (score * 0.507246376811594) * secondaryScale;
        winger = (score * 0.188405797101449) * secondaryScale;
        passing = (score * 1.217391304347826) * secondaryScale;
    } else if(position == 'Forward' && alignment == 'Towards Defense [Tech]') {
        scoring = score;
        playmaking = (score * 0.507246376811594) * secondaryScale;
        winger = (score * 0.188405797101449) * secondaryScale;
        passing = (score * 1.36231884057971) * secondaryScale;
    } else if(position == 'Forward' && alignment == 'Towards Wing') {
        scoring = score;
        playmaking = (score * 0.110294117647059) * secondaryScale;
        winger = (score * 0.625) * secondaryScale;
        passing = (score * 0.367647058823529) * secondaryScale;
    }

    player.querySelector('.ideal-skill-row[data-ideal-skill="defending"] .ideal-skill-score').innerHTML = scorify(defending);
    player.querySelector('.ideal-skill-row[data-ideal-skill="playmaking"] .ideal-skill-score').innerHTML = scorify(playmaking);
    player.querySelector('.ideal-skill-row[data-ideal-skill="winger"] .ideal-skill-score').innerHTML = scorify(winger);
    player.querySelector('.ideal-skill-row[data-ideal-skill="passing"] .ideal-skill-score').innerHTML = scorify(passing);
    player.querySelector('.ideal-skill-row[data-ideal-skill="scoring"] .ideal-skill-score').innerHTML = scorify(scoring);


    let url = 'https://lizardopoli.altervista.org/wagewizard/?params=true-true--17-false-8';
    url += '-false-0';
    url += '-false-' + parseInt(defending);
    url += '-false-' + parseInt(playmaking);
    url += '-false-' + parseInt(winger);
    url += '-false-' + parseInt(passing);
    url += '-false-' + parseInt(scoring) + '-0';
    if(findWages) {
        findWages.setAttribute('data-url', url);
    }
}

function scorify(number) {
    let floor = Math.floor(number);
    let text = '';
    if(floor == 0) {
        text = 'disastrous (';
    } else if(floor == 1) {
        text = 'disastrous (';
    } else if(floor == 2) {
        text = 'wretched (';
    } else if(floor == 3) {
        text = 'poor (';
    } else if(floor == 4) {
        text = 'weak (';
    } else if(floor == 5) {
        text = 'inadequate (';
    } else if(floor == 6) {
        text = 'passable (';
    } else if(floor == 7) {
        text = 'solid (';
    } else if(floor == 8) {
        text = 'excellent (';
    } else if(floor == 9) {
        text = 'formidable (';
    } else if(floor == 10) {
        text = 'outstanding (';
    } else if(floor == 11) {
        text = 'brilliant (';
    } else if(floor == 12) {
        text = 'magnificent (';
    } else if(floor == 13) {
        text = 'world class (';
    } else if(floor == 14) {
        text = 'supernatural (';
    } else if(floor == 15) {
        text = 'titanic (';
    } else if(floor == 16) {
        text = 'extra-terrestrial (';
    } else if(floor == 17) {
        text = 'mythical (';
    } else if(floor == 18) {
        text = 'magical (';
    } else if(floor == 19) {
        text = 'utopian (';
    } else {
        text = 'divine (';
    }
    text += (Math.floor(number * 100) / 100) + ')';
    return text;
}

function floorToTwoDecimals(num) {
    return ;
}