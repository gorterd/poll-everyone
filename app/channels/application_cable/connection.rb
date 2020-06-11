module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_participant 

    def connect
      self.current_participant = find_participant
    end

    private

    def find_participant
      User.find_by( session_token: cookies.signed[:session_token] ) || anonymous
    end

    def anonymous
      anon = UnregisteredParticipant.find_by( participant_session_token: cookies.signed[:participant_session_token] )
      unless anon
        anon = UnregisteredParticipant.create()
        cookies.signed[:participant_session_token] = { 
          value: anon.participant_session_token, 
          path: '/participate',
          expires: 1.year 
        }
      end

      anon
    end

  end
end
