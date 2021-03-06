import React from 'react';
import classNames from 'classnames';
import CareerItem from './CareerItem';
import css from '../../css/components/Masthead.css';

class Masthead extends React.Component {

  constructor(props) {
    super(props);

    this.clickMasthead = this.clickMasthead.bind(this);
    this.clickMastheadMobile = this.clickMastheadMobile.bind(this);

    this.state = {
      mastheadActive: false,
    }
  }

  renderCareers(key, faction) {
    if (this.props.careers[key].race === faction) {
      return (
        <CareerItem key={key} gaCareerSelected={this.props.gaCareerSelected} shortName={key} careerName={this.props.careers[key].name} />
      );
    }
    return false;
  }

  clickMasthead(e) {
    e.preventDefault();
    this.setState({
      mastheadActive: !this.state.mastheadActive,
    });
  }

  clickMastheadMobile(e) {
    e.preventDefault();
    this.props.updateSidebarVisibility(true);
    this.props.updateOverlayVisibility(true);
  }

  render() {
    const mastheadClass = classNames({
      [css.masthead]: !this.state.mastheadActive,
      [css.mastheadActive]: this.state.mastheadActive,
    });
    const mastheadTitleClass = classNames({
      [css.mastheadTitle]: !this.state.mastheadActive,
      [css.mastheadTitleActive]: this.state.mastheadActive,
    });
    const mastheadCtaClass = classNames({
      [css.mastheadCta]: !this.state.mastheadActive,
      [css.mastheadCtaActive]: this.state.mastheadActive,
      'hidden@mobile': true,
    });
    const mastheadCtaClassMobile = classNames({
      [css.mastheadCta]: !this.state.mastheadActive,
      [css.mastheadCtaActive]: this.state.mastheadActive,
      'visible@mobile': true,
    });
    const mastheadFooterClass = classNames({
      [css.mastheadFooter]: !this.state.mastheadActive,
      [css.mastheadFooterActive]: this.state.mastheadActive,
    });
    const careersContainerLeftClass = classNames({
      [css.careersContainerLeft]: !this.state.mastheadActive,
      [css.careersContainerLeftActive]: this.state.mastheadActive,
    });
    const careersContainerRightClass = classNames({
      [css.careersContainerRight]: !this.state.mastheadActive,
      [css.careersContainerRightActive]: this.state.mastheadActive,
    });
    return (
      <div className={mastheadClass}>
        <div className={css.mastheadOverlay}>
          <div className={mastheadTitleClass}>RoR Career Builder</div>
          <div className={css.mastheadSubtitle}>Online Career Builder for Return of Reckoning</div>
          <div className={mastheadCtaClass}>
            <button className={css.mastheadCtaButton} type="button" onClick={this.clickMasthead}>
              Select career
            </button>
          </div>
          <div className={mastheadCtaClassMobile}>
            <button className={css.mastheadCtaButton} type="button" onClick={this.clickMastheadMobile}>
              Select career
            </button>
          </div>
          <a className={mastheadFooterClass} href="#" onClick={this.clickMasthead}>Hide careers</a>
          <div className={css.careers}>
            <div className={careersContainerLeftClass}>
              <div className={css.careersTitle}>Order</div>
              <div className={css.careersFaction}>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/dwarf.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>Dwarves</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'Dwarf')
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/high-elf.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>High Elves</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'High Elf')
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/empire.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>Empire</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'Empire')
                  )}
                </div>
              </div>
            </div>
            <div className={careersContainerRightClass}>
              <div className={css.careersTitle}>Destruction</div>
              <div className={css.careersFaction}>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/greenskin.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>Greenskins</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'Greenskin')
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/dark-elf.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>Dark Elves</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'Dark Elf')
                  )}
                </div>
                <div className={css.careersRace}>
                  <div className="row row--v-center marginBottom">
                    <img src="/images/icons/chaos.png" className={css.careersRaceIcon} />
                    <div className={css.careersRaceTitle}>Chaos</div>
                  </div>
                  {Object.keys(this.props.careers).map(
                    (key) => this.renderCareers(key, 'Chaos')
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Masthead.propTypes = {
  careers: React.PropTypes.object,
  gaCareerSelected: React.PropTypes.func,
  updateSidebarVisibility: React.PropTypes.func,
  updateOverlayVisibility: React.PropTypes.func,
};

export default Masthead;
