import React from 'react';
import classNames from 'classnames';
import Popover from './Popover';
import PopoverAbility from './PopoverAbility';
import Overlay from './Overlay';
import css from '../../css/components/AbilityMorale.css';

class AbilityMorale extends React.Component {

  /*
  abilityStatus = enabled/disabled
  abilitySelected = selected i.e. clicked
  abilityHovered = ability is currently in hover state
  */
  constructor(props) {
    super(props);
    // Bind functions early. More performant. Upgrade to autobind when Babel6 sorts itself out
    this.abilityClicked = this.abilityClicked.bind(this);
    this.abilityHoverOver = this.abilityHoverOver.bind(this);
    this.abilityHoverOut = this.abilityHoverOut.bind(this);
    // Passed to Popover for mobile selection button. Determine's whether ability is available for selection
    this.abilityOperational = this.abilityOperational.bind(this);
    // Touch event to replace mouseover/out on mobile size
    this.abilityTouchEnd = this.abilityTouchEnd.bind(this);
    this.setOverlay = this.setOverlay.bind(this);
    this.overlayClicked = this.overlayClicked.bind(this);

    this.state = {
      abilityStatus: false,
      abilitySelected: false,
      abilityHovered: false,
      overlay: {
        visible: false,
      },
    };
  }

  // Initial render
  componentDidMount() {
    this.setInitialStatus(
      this.props.currentLevel,
      this.props.details.minrank,
      this.props[`selectedMorale${this.props.moraleRank}`]
    );
  }

  // About to update because parent changed
  componentWillReceiveProps(nextProps) {
    this.setInitialStatus(
      nextProps.currentLevel,
      nextProps.details.minrank,
      nextProps[`selectedMorale${nextProps.moraleRank}`]
    );
  }

  setInitialStatus(currentLevel, minrank, selectedMorale) {
    // Determine if ability is selected
    if (Number(selectedMorale) === Number(this.props.details.id)) {
      this.setState({
        abilitySelected: true,
      });
    } else {
      this.setState({
        abilitySelected: false,
      });
    }
    if (Number(currentLevel) >= Number(minrank)) {
      this.setState({ abilityStatus: true });
    } else {
      this.setState({ abilityStatus: false });
    }
  }

  abilityClicked() {
    // Select ability i.e. not already selected
    if (this.state.abilitySelected === false) {
      // Active ability selected
      if (this.state.abilityStatus) {
        this.props.updateSelectedMorale(this.props.moraleRank, this.props.details.id);
      }
    // Unselect ability
    } else {
      // Remove this abilityId from selectedMoraleX
      this.props.updateSelectedMorale(this.props.moraleRank, this.props.details.id);
    }
  }

  abilityHoverOver() {
    this.setState({
      abilityHovered: true,
    });
  }

  abilityHoverOut() {
    this.setState({
      abilityHovered: false,
    });
  }

  abilityOperational() {
    if (this.state.abilityStatus) {
      return true;
    }
    return false;
  }

  abilityTouchEnd(event) {
    event.preventDefault();
    this.setOverlay(true);
    this.abilityHoverOver();
    this.abilityClicked();
  }

  setOverlay(status) {
    this.state.overlay.visible = status;
    this.setState({
      overlay: this.state.overlay,
    });
  }

  overlayClicked() {
    this.setOverlay(false);
    this.abilityHoverOut();
  }

  render() {
    const abilityClass = classNames({
      [css.ability]: true,
      [css.abilitySelected]: this.state.abilitySelected,
      'is-hovered': this.state.abilityHovered,
      popover__parent: true,
      'marginRight--small@mobile': true,
    });
    const abilityImageClass = classNames({
      [css.image]: this.state.abilityStatus,
      [css.imageInactive]: !this.state.abilityStatus,
    });
    const imgSrc = `../../images/abilities/${this.props.details.image}.png`;
    const popoverContent = (
      <PopoverAbility details={this.props.details} imgSrc={imgSrc} />
    );
    return (
      <div className={abilityClass} ref="popoverParent">
        <Overlay
          overlay={this.state.overlay}
          hideOverlay={this.overlayClicked}
          visible={false}
        />
        <img
          className={abilityImageClass}
          src={imgSrc}
          alt={this.props.details.name}
          onTouchEnd={this.abilityTouchEnd}
          onMouseOver={this.abilityHoverOver}
          onMouseOut={this.abilityHoverOut}
          onClick={this.abilityClicked}
        />
        <Popover
          content={popoverContent}
          alignment="top"
          activate={this.state.abilityHovered}
          abilityOptional
          abilityStatus={this.state.abilityStatus}
          abilityOperational={this.abilityOperational()}
          abilityClicked={this.abilityClicked}
          abilitySelected={this.state.abilitySelected}
          overlayClicked={this.overlayClicked}
        />
      </div>
    );
  }
}

AbilityMorale.propTypes = {
  details: React.PropTypes.object,
  pathMeter: React.PropTypes.number,
  currentLevel: React.PropTypes.number,
  moraleRank: React.PropTypes.number,
  selectedMorale1: React.PropTypes.number,
  selectedMorale2: React.PropTypes.number,
  selectedMorale3: React.PropTypes.number,
  selectedMorale4: React.PropTypes.number,
  updateSelectedMorale: React.PropTypes.func,
};

export default AbilityMorale;
