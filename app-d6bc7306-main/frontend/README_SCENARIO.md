# Scenario Agent Wrapper

This application is a wrapper UI for ElevenLabs Conversational Agents, designed to be embedded in Learn Worlds courses.

## URL Parameters

You can customize the scenario by appending the following parameters to the URL:

- `agent_id`: The ID of your ElevenLabs agent (e.g., `agent_abc123...`).
- `title`: The title of the scenario (e.g., "Customer Service Simulation").
- `description`: A short description of the scenario.
- `avatar_url`: URL to an image to use as the avatar.
- `instructions`: Specific instructions for the user.

### Example URL

```
https://your-app-url.com/?agent_id=agent_9701kg09nwp2fc5t8ew3d5apd277&title=Sales+Call&description=Practice+your+sales+pitch&avatar_url=https://example.com/avatar.jpg
```

## Integration

Embed this application using an `iframe` in your Learn Worlds course. The recommended size is 876x792.

## Development

- The main logic is in `frontend/components/scenario/ScenarioFlow.tsx`.
- The ElevenLabs integration is in `frontend/components/scenario/SimulationScreen.tsx`.

